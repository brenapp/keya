/**
 * Represents a specific Keya Store
 * Implemented by browser/node implementations
 */

export default abstract class Store {
  name: string;
  version: number = 0;

  abstract store: { [key: string]: any };

  // API Implementation
  async get(key: string) {
    await this.load();
    return this.store[key];
  }

  async set(key: string, value: any) {
    await this.load();
    this.store[key] = value;

    try {
      await this.save();
      return true;
    } catch (e) {
      return false;
    }
  }

  async delete(key: string) {
    await this.load();
    return delete this.store[key];
  }

  async all() {
    await this.load();
    return Object.keys(this.store).map(key => ({
      key,
      value: this.store[key]
    }));
  }

  async find(finder: (value: any, name: string) => Promise<boolean> | boolean) {
    let all = await this.all();
    let include = await Promise.all(
      all.map(({ value, key }) => finder(value, key))
    );

    return all.filter((v, i, a) => include[i]);
  }

  async clear() {
    this.store = {};
    await this.save();
  }

  // Lifecycle
  abstract async initalize(): Promise<void>;
  abstract async load(): Promise<void>;
  abstract async save(): Promise<void>;

  constructor(name: string) {
    this.name = name;
  }
}
