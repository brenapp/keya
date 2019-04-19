import Store from "../core/Store";
export default class IndexedDBStore extends Store {
    index: IDBObjectStore;
    initalize(): Promise<void>;
    store: {
        [key: string]: any;
    };
    load(): Promise<void>;
    save(): Promise<void>;
    static stores(): Promise<string[]>;
}
