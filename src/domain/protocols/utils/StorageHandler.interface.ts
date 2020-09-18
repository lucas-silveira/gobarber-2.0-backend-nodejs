export interface ISaveFile {
  saveFile: (path: string, filename: string) => Promise<void>;
}

export interface ICheckFileExists {
  checkFileExistss: (path: string, filename: string) => Promise<boolean>;
}

export interface IDeleteFile {
  deleteFile: (folder: string, filename: string) => Promise<void>;
}

export interface IStorageHandler
  extends ISaveFile,
    ICheckFileExists,
    IDeleteFile {}
