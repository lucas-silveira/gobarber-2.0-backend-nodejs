export interface IStorageHandler {
  hasFile: (path: string, filename: string) => Promise<boolean>;
  deleteFile: (folder: string, filename: string) => Promise<void>;
}
