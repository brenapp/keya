import IndexedDBStore from "./indexeddb";
import LocalStorageStore from "./localhost";

const IDBSupported = "indexedDB" in window;

export async function store(name: string) {
  const store = IDBSupported
    ? new IndexedDBStore(name)
    : new LocalStorageStore(name);
  await store.initalize();
  await store.load();

  return store;
}

export async function stores() {
  return IDBSupported ? IndexedDBStore.stores() : LocalStorageStore.stores();
}
