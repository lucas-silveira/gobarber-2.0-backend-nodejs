import fs from 'fs';
import path from 'path';

import { storage } from '@configs/upload';
import { IStorageHandler } from './StorageHandler.interface';

class FSStorageHandlerAdapter implements IStorageHandler {
  private storage: string;

  constructor() {
    this.storage = storage;
  }

  public async hasFile(folder: string, filename: string): Promise<boolean> {
    const filepath = path.join(this.storage, folder, filename);
    try {
      await fs.promises.stat(filepath);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async deleteFile(folder: string, filename: string): Promise<void> {
    const filepath = path.join(this.storage, folder, filename);
    return fs.promises.unlink(filepath);
  }
}

export default FSStorageHandlerAdapter;
