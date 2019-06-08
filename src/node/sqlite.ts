import sqlite, { Database } from "sqlite";
import { join } from "path";
import { tmpdir } from "os";

import Store from "../core/Store";

const { version } = require("../../package.json");
const DB = join(tmpdir(), `keya-v${version}.sqlite`);

export default class SQLiteStore extends Store {
  db: Database = null as any;
  file: string = "";

  private statements: { [key: string]: sqlite.Statement } = {};

  async initalize() {
    this.db = await sqlite.open(DB);

    await this.db.run(
      `CREATE TABLE IF NOT EXISTS ${
        this.name
      } (id TINYTEXT PRIMARY KEY, value TEXT)`
    );

    this.statements = {
      get: await this.db.prepare(`SELECT * from "${this.name}" WHERE id = ?`),
      all: await this.db.prepare(`SELECT * FROM "${this.name}"`),
      set: await this.db.prepare(
        `INSERT INTO "${
          this.name
        }" (id, value) VALUES ($id, $value) ON CONFLICT(id) DO UPDATE SET value=$value`
      )
    };
  }

  store: { [key: string]: any } = {};

  // Save and load (done automagically by SQLite)
  async load() {}
  async save() {}

  async get(key: string) {
    return this.db
      .get(`SELECT * from "${this.name}" WHERE id = ?`, key)
      .then(({ value }) => JSON.parse(value).value);
  }

  async set(key: string, value: any) {
    const stmt = await this.statements.set
      .run({
        $value: JSON.stringify({ value }),
        $id: key
      })
      .then(r => r.get());
    return stmt;
  }

  async delete(key: string) {
    const updated = await this.db.run(
      `DELETE FROM "${this.name}" WHERE id = ?`,
      key
    );
    return updated.changes > 0;
  }

  async all() {
    const results = await this.statements.all.all();

    return results.map(({ id, value }) => ({
      key: id,
      value: JSON.parse(value).value
    }));
  }

  static async stores(): Promise<string[]> {
    return sqlite
      .open(DB)
      .then(db => db.all("SELECT name FROM sqlite_master WHERE type='table'"))
      .then(records => records.map(r => r.name));
  }
}
