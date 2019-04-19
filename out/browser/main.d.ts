import IndexedDBStore from "./indexeddb";
import LocalStorageStore from "./localhost";
export declare function store(name: string): Promise<IndexedDBStore | LocalStorageStore>;
export declare function stores(): Promise<string[]>;
