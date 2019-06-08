import SQLiteStore from "./sqlite";
export declare function store(name: string): Promise<SQLiteStore>;
export declare function stores(): Promise<string[]>;
