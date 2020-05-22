import * as sqlite from "sqlite";
import { Database as DatabaseDriver } from "sqlite3";
import { join } from "path";
import { tmpdir } from "os";

import Store from "../core/Store";

const { version } = require("../../package.json");
const DB = join(tmpdir(), `keya-v${version}.sqlite`);

export default class SQLiteStore<T> extends Store<T> {
  db: sqlite.Database = null as any;
  file: string = "";

  private statements: { [key: string]: sqlite.Statement } = {};

  async prepare() {
    this.db = await sqlite.open({
      filename: DB,
      driver: DatabaseDriver,
    });

    // Ensure store table exists
    await this.db.run(
      `CREATE TABLE IF NOT EXISTS ${this.name} (id TINYTEXT PRIMARY KEY, value TEXT)`
    );

    // Make reads/writes not affect each other, giving fewer concurrency errors
    await this.db.run("PRAGMA journal_mode = WAL;");

    this.statements = {
      get: await this.db.prepare(`SELECT * from "${this.name}" WHERE id = ?`),
      all: await this.db.prepare(`SELECT * FROM "${this.name}"`),
      set: await this.db.prepare(
        `INSERT INTO "${this.name}" (id, value) VALUES ($id, $value) ON CONFLICT(id) DO UPDATE SET value=$value`
      ),
    };
  }

  async get(key: string): Promise<T | null> {
    const item = await this.db.get(
      `SELECT * from "${this.name}" WHERE id = ?`,
      key
    );

    if (!item) {
      return null;
    }

    return await this.hydrate(item.value);
  }

  async has(key: string) {
    return this.get(key).then((res) => res !== null);
  }

  async set(key: string, value: T) {
    const result = await this.statements.set.run({
      $value: await this.stringify(value),
      $id: key,
    });

    return !!result.changes;
  }

  async delete(key: string) {
    const updated = await this.db.run(
      `DELETE FROM "${this.name}" WHERE id = ?`,
      key
    );
    return !!updated.changes;
  }

  async all() {
    const results = await this.statements.all.all();

    return Promise.all(
      results.map(async ({ id, value }) => ({
        key: id,
        value: await this.hydrate(value),
      }))
    );
  }

  static async stores(): Promise<string[]> {
    return sqlite
      .open({
        filename: DB,
        driver: DatabaseDriver,
      })
      .then((db) => db.all("SELECT name FROM sqlite_master WHERE type='table'"))
      .then((records) => records.map((r) => r.name));
  }
}
