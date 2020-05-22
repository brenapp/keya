import Store from "../core/Store";

function openDB(name: string) {
  let open = indexedDB.open(`keya-${name}`, 1);
  return new Promise<IDBObjectStore>((resolve, reject) => {
    open.onupgradeneeded = function () {
      open.result.createObjectStore("docs", { keyPath: "key" });
    };
    open.onsuccess = function () {
      try {
        let db = open.result;
        let tx = db.transaction("docs", "readwrite");
        let docs = tx.objectStore("docs");
        resolve(docs);
      } catch (e) {
        reject(e);
      }
    };
    open.onerror = reject;
  });
}

export default class IndexedDBStore<T> extends Store<T> {
  index: IDBObjectStore | null = null;
  async prepare() {
    let stores = await IndexedDBStore.stores();

    if (!stores.includes(this.name)) {
      stores.push(this.name);
      localStorage.setItem("keya-idb-stores", stores.join(","));
    }

    this.index = await openDB(this.name);
  }

  async all(): Promise<{ key: string; value: T }[]> {
    return new Promise((resolve, reject) => {
      if (this.index == null) {
        reject(new Error("Database has not be prepared"));
        return;
      }

      const all = this.index.getAll();
      all.onerror = reject;
      all.onsuccess = () => {
        resolve(all.result);
      };
    });
  }

  async delete(key: string) {
    return new Promise<boolean>((resolve, reject) => {
      if (this.index === null) {
        return reject(new Error("Database has not been prepared"));
      }

      const tx = this.index.delete(key);
      tx.onerror = reject;
      tx.onsuccess = () => {
        resolve(true);
      };
    });
  }

  async get(key: string) {
    return new Promise<T | null>((resolve, reject) => {
      if (this.index === null) {
        return reject(new Error("Database has not been prepared"));
      }

      const tx = this.index.get(key);
      tx.onerror = reject;
      tx.onsuccess = () => {
        resolve(tx.result ? this.hydrate(tx.result.value) : null);
      };
    });
  }

  async has(key: string) {
    return this.get(key).then((result) => result !== null);
  }

  async set(key: string, value: T) {
    return new Promise<boolean>((resolve, reject) => {
      if (this.index === null) {
        return reject(new Error("Database has not been prepared"));
      }

      const tx = this.index.put({ key, value: this.stringify(value) });
      tx.onerror = reject;
      tx.onsuccess = () => resolve(true);
    });
  }

  static async stores() {
    return (localStorage.getItem("keya-idb-stores") || "").split(",");
  }
}
