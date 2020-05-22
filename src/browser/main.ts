import IndexedDBStore from "./indexeddb";
import LocalStorageStore from "./localhost";
import { HydrateFunction } from "../core/Store";

const IDBSupported = "indexedDB" in window;

export async function store<T = any>(name: string) {
  const store = IDBSupported
    ? new IndexedDBStore<T>(name)
    : new LocalStorageStore<T>(name);

  await store.prepare();

  return store;
}

export async function stores() {
  return IDBSupported ? IndexedDBStore.stores() : LocalStorageStore.stores();
}
