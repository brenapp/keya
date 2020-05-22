/**
 * Represents a specific Keya Store
 * Implemented by browser/node implementations
 *
 * Basically, this extends a Map, without doing so (because async operations mess it up)
 */

export type HydrateFunction<T> = (stored: string) => Promise<T> | T;
export type StringifyFunction<T> = (prepared: T) => Promise<string> | string;

export default abstract class Store<T> {
  name: string;
  version: number = 0;

  hydrate: HydrateFunction<T> = JSON.parse;
  stringify: StringifyFunction<T> = JSON.stringify;

  constructor(name: string) {
    this.name = name;
  }

  abstract async prepare(): Promise<void>;

  // Access
  abstract async all(): Promise<
    {
      key: string;
      value: T;
    }[]
  >;
  abstract async get(key: string): Promise<T | null>;
  abstract async set(key: string, value: T): Promise<boolean>;
  abstract async delete(key: string): Promise<boolean>;
  abstract async has(key: string): Promise<boolean>;

  /**
   * Deletes all elements from a store
   */
  async clear() {
    const records = await this.all();

    return Promise.all(records.map(({ key }) => this.delete(key)));
  }

  /**
   * Iterates through each element
   * @param callback Handles each function
   */
  async forEach(callback: (value: T, key: string, store: Store<T>) => void) {
    const records = await this.all();
    records.forEach(({ key, value }) => callback(value, key, this));
  }

  /**
   * Async Iterator
   *
   * for await (const { key, value } in store) {
   *  console.log(key, value)
   * }
   *
   */
  async *[Symbol.asyncIterator]() {
    const records = await this.all();

    for (const record of records) {
      yield record;
    }
  }
}
