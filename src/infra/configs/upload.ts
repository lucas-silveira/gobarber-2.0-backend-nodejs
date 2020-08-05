import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export const storage: string = path.resolve(__dirname, '..', '..', '..', 'tmp');

export const config = {
  directory: path.join(storage),
  storage: multer.diskStorage({
    destination: path.join(storage),
    filename(_, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export default multer(config);
