import { IStorageHandler } from './StorageHandler.interface';
import FSStorageHandlerAdapter from './FSStorageHandler.adapter';

class StorageHandler implements IStorageHandler {
  private storageHandlerAdapter: IStorageHandler;

  constructor() {
    this.storageHandlerAdapter = new FSStorageHandlerAdapter();
  }

  public async hasFile(folder: string, filename: string): Promise<boolean> {
    return this.storageHandlerAdapter.hasFile(folder, filename);
  }

  public async deleteFile(folder: string, filename: string): Promise<void> {
    this.storageHandlerAdapter.deleteFile(folder, filename);
  }
}

export default new StorageHandler();
