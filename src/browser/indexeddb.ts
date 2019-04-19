import Store from "../core/Store";

function openDB(name: string) {
  var open = indexedDB.open(`keya-${name}`, 1);
  return new Promise<IDBObjectStore>((resolve, reject) => {
    open.onupgradeneeded = function() {
      open.result.createObjectStore("docs", { keyPath: "name" });
    };
    open.onsuccess = function() {
      try {
        var db = open.result;
        var tx = db.transaction("docs", "readwrite");
        var docs = tx.objectStore("docs");
        resolve(docs);
      } catch (e) {
        reject(e);
      }
    };
    open.onerror = reject;
  });
}

export default class IndexedDBStore extends Store {
  index: IDBObjectStore = null as any;
  async initalize() {
    let stores = await IndexedDBStore.stores();

    if (!stores.includes(this.name)) {
      stores.push(this.name);
      localStorage.setItem("keya-idb-stores", stores.join(","));
    }

    this.index = await openDB(this.name);
  }

  // Hardware interactions
  store: { [key: string]: any } = {};
  async load(): Promise<void> {
    const top = this;
    return new Promise((resolve, reject) => {
      this.index.getAll().onsuccess = function(event) {
        for (let record of this.result) {
          top.store[record.key] = record.value;
        }
        resolve();
      };
    });
  }
  async save(): Promise<void> {
    const top = this;
    return new Promise((resolve, reject) => {
      let keys = Object.keys(this.store);

      for (let key of keys) {
        this.index.put(this.store[key], key);
      }
    });
  }

  static async stores() {
    return (localStorage.getItem("keya-idb-stores") || "").split(",");
  }
}
