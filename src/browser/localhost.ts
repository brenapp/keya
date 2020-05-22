import Store from "../core/Store";

export default class LocalStoreStore<T> extends Store<T> {
  prefix: string = "";
  async prepare() {
    let stores = await LocalStoreStore.stores();

    if (!stores.includes(this.name)) {
      stores.push(this.name);
      localStorage.setItem("keya-localhost-stores", stores.join(","));
    }

    this.prefix = `keya-store-${this.name}-v${this.version}-`;
  }

  /**
   * Gets all keys in the store
   */
  async all() {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith(this.prefix)
    );

    return keys.map((key) => ({
      key,
      value: (localStorage.getItem("key") as unknown) as T,
    }));
  }

  /**
   * Gets a particular key in the store
   * @param key to get
   */
  async get(key: string): Promise<T | null> {
    const value = localStorage.getItem(this.prefix + key);

    if (!value) {
      return null;
    }

    return this.hydrate(value);
  }

  /**
   * Sets a particular key in the store
   * @param key to set
   * @param value to set it to
   */
  async set(key: string, value: T): Promise<boolean> {
    const encoded = await this.stringify(value);

    localStorage.setItem(this.prefix + key, encoded);
    return true;
  }

  /**
   * Deletes a specified key from the store
   * @param key to delete
   */
  async delete(key: string): Promise<boolean> {
    localStorage.removeItem(this.prefix + key);
    return true;
  }

  /**
   * Checks if they key has a value in the store
   * @param key to check
   */
  async has(key: string): Promise<boolean> {
    return localStorage.hasOwnProperty(this.prefix + key);
  }

  /**
   * Gets all stores
   */
  static async stores() {
    return (localStorage.getItem("keya-localhost-stores") || "").split(",");
  }
}
