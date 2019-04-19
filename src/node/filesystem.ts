import Store from "../core/Store";
import { promises as fs, constants } from "fs";
import { join } from "path";
import { tmpdir } from "os";

const { version } = require("../../package.json");

const FOLDER = join(tmpdir(), `keya-v${version}`);

export default class FileSystemStore extends Store {
  file: string = "";
  async initalize() {
    this.file = join(FOLDER, `${this.name}-v${this.version}.json`);
    try {
      await fs.access(
        this.file,
        constants.F_OK | constants.R_OK | constants.W_OK
      );
    } catch (e) {
      // Make directory
      try {
        await fs.mkdir(join(FOLDER), { recursive: true });
      } catch (e) {
        if (e.code != "EEXIST") {
          return Promise.reject(
            new Error(
              "Could not make keya directory. Make sure temporary file has correct permissions"
            )
          );
        }
      } finally {
        // Make file
        return fs.writeFile(this.file, "{}");
      }
    }
  }

  // Get all stores
  static async stores(): Promise<FileSystemStore[]> {
    return fs.readdir(FOLDER).then(files => {
      const stores = [];
      for (let file of files) {
        const [, name, version] = file.match(/([A-z]+)\-v([0-9]+)(\.json)/) || [
          null,
          null,
          null
        ];

        // Ignore files which aren't keya files
        if (!name || !version) continue;

        stores.push(new FileSystemStore(name));
      }
      return stores;
    });
  }

  // Hardware interactions
  store: { [key: string]: any } = {};
  async load(): Promise<void> {
    return fs.readFile(this.file).then(buffer => {
      this.store = JSON.parse(buffer.toString());
    });
  }
  async save(): Promise<void> {
    const savable = JSON.stringify(this.store);
    return fs.writeFile(this.file, savable);
  }
}
