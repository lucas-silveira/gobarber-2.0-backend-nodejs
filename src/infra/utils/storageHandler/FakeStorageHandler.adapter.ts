import { IStorageHandler } from '@domain/protocols/utils/StorageHandler.interface';

class FakeStorageHandlerAdapter implements IStorageHandler {
  private storage: string[];

  constructor() {
    this.storage = [];
  }

  public async saveFile(folder: string, filename: string): Promise<void> {
    this.storage.push(`${folder}/${filename}`);
    Promise.resolve();
  }

  public async hasFile(folder: string, filename: string): Promise<boolean> {
    const filepath = `${folder}/${filename}`;
    const fileFound = this.storage.find(
      storageFile => storageFile === filepath,
    );

    if (!fileFound) return false;
    return true;
  }

  public async deleteFile(folder: string, filename: string): Promise<void> {
    const filepath = `${folder}/${filename}`;
    const fileIndex = this.storage.findIndex(
      storageFile => storageFile === filepath,
    );

    this.storage.splice(fileIndex, 1);
    Promise.resolve();
  }
}

export default FakeStorageHandlerAdapter;
