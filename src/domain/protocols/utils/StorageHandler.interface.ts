export interface IStorageHandler {
  saveFile: (path: string, filename: string) => Promise<void>;
  hasFile: (path: string, filename: string) => Promise<boolean>;
  deleteFile: (folder: string, filename: string) => Promise<void>;
}
