import SQLiteStore from "./sqlite";

export async function store<T = any>(name: string) {
  const store = new SQLiteStore<T>(name);
  await store.prepare();

  return store;
}

export const stores = SQLiteStore.stores;
