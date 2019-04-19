import Store from "../core/Store";
export default class FileSystemStore extends Store {
    file: string;
    initalize(): Promise<void>;
    static stores(): Promise<FileSystemStore[]>;
    store: {
        [key: string]: any;
    };
    load(): Promise<void>;
    save(): Promise<void>;
}
