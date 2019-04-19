/**
 * Represents a specific Keya Store
 * Implemented by browser/node implementations
 */

export default abstract class Store {
  name: string;
  version: number;

  // API surface
  abstract async get(key: string): Promise<any>;
  abstract async set(key: string, value: any): Promise<boolean>;

  abstract async find(
    finder: (value: any, name: string) => Promise<boolean> | boolean
  ): Promise<any[]>;
  abstract async all(): Promise<any[]>;

  abstract async clear(): Promise<void>;

  // Lifecycle
  abstract async initalize(): Promise<void>;
  abstract async load(): Promise<void>;
  abstract async save(): Promise<void>;

  constructor(name: string, version = 0) {
    this.name = name;
    this.version = version;

    this.initalize();
    this.load();
  }
}
