import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export const storage: string = path.resolve(__dirname, '..', '..');

export const config = {
  directory: path.join(storage, 'tmp'),
  storage: multer.diskStorage({
    destination: path.join(storage, 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export default multer(config);