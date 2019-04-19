import FileSystemStore from "./filesystem";

export async function store(name: string) {
  const store = new FileSystemStore(name);
  await store.initalize();
  await store.load();

  return store;
}

export async function stores() {
  return FileSystemStore.stores();
}
