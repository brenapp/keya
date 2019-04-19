import Store from "../core/Store";

export default class LocalStoreStore extends Store {
  async initalize() {
    let stores = await LocalStoreStore.stores();

    if (!stores.includes(this.name)) {
      stores.push(this.name);
      localStorage.setItem("keya-localhost-stores", stores.join(","));
    }
  }

  // Hardware interactions
  store: { [key: string]: any } = {};
  async load(): Promise<void> {
    Object.keys(localStorage)
      .filter(key => key.startsWith(`keya-store-${this.name}-v${this.version}`))
      .forEach(key => {
        this.store[key] = JSON.parse(`${localStorage.getItem(key)}`);
      });
  }
  async save(): Promise<void> {
    let keys = Object.keys(this.store);

    keys.forEach(key => {
      localStorage.setItem(
        `keya-store-${this.name}-v${this.version}-${key}`,
        JSON.stringify(this.store[key])
      );
    });
  }

  static async stores() {
    return (localStorage.getItem("keya-localhost-stores") || "").split(",");
  }
}
