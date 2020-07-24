import { Router } from 'express';

import upload from '@configs/upload';
import userControllerFactory from '@main/controllers/http/httpUsers/UserController.factory';
import { authenticationMiddleware } from '../middlewares';

const usersRouter = Router();
const { createUser, updateAvatar } = userControllerFactory();

usersRouter.post('/', async (request, response) => {
  const user = await createUser.handle(request.body);
  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  authenticationMiddleware,
  upload.single('file'),
  async (request, response) => {
    await updateAvatar.handle({
      userId: request.user.id,
      avatarName: request.file.filename,
    });
    return response.json();
  },
);

export default usersRouter;
