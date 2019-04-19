/**
 * Represents a specific Keya Store
 * Implemented by browser/node implementations
 */
export default abstract class Store {
    name: string;
    version: number;
    abstract store: {
        [key: string]: any;
    };
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<boolean>;
    delete(key: string): Promise<boolean>;
    all(): Promise<{
        key: string;
        value: any;
    }[]>;
    find(finder: (value: any, name: string) => Promise<boolean> | boolean): Promise<{
        key: string;
        value: any;
    }[]>;
    clear(): Promise<void>;
    abstract initalize(): Promise<void>;
    abstract load(): Promise<void>;
    abstract save(): Promise<void>;
    constructor(name: string);
}
