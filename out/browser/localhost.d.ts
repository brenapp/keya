import Store from "../core/Store";
export default class LocalStoreStore extends Store {
    initalize(): Promise<void>;
    store: {
        [key: string]: any;
    };
    load(): Promise<void>;
    save(): Promise<void>;
    static stores(): Promise<string[]>;
}
