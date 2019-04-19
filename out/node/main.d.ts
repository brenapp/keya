import FileSystemStore from "./filesystem";
export declare function store(name: string): Promise<FileSystemStore>;
export declare function stores(): Promise<FileSystemStore[]>;
