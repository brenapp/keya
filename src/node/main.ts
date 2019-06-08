import FileSystemStore from "./filesystem";
import SQLiteStore from "./sqlite";

export async function store(name: string) {
  const store = new SQLiteStore(name);
  await store.initalize();
  await store.load();

  return store;
}

export async function stores() {
  return SQLiteStore.stores();
}
