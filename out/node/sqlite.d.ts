import { Database } from "sqlite";
import Store from "../core/Store";
export default class SQLiteStore extends Store {
    db: Database;
    file: string;
    private statements;
    initalize(): Promise<void>;
    store: {
        [key: string]: any;
    };
    load(): Promise<void>;
    save(): Promise<void>;
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<any>;
    delete(key: string): Promise<boolean>;
    all(): Promise<{
        key: any;
        value: any;
    }[]>;
    static stores(): Promise<any[]>;
}
