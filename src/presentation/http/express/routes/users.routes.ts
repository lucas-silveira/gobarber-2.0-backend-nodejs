import { Router } from 'express';

import upload from '@infra/configs/upload';
import userControllerFactory from '@application/controllers/User/UserController.factory';
import { authenticationMiddleware } from '../middlewares';

const usersRouter = Router();
const {
  createUser,
  updateAvatar,
  recoveryPassword,
  resetPassword,
} = userControllerFactory();

usersRouter.post('/', async (request, response) => {
  const user = await createUser.handle(request.body);
  return response.json(user);
});

usersRouter.post('/recovery-password', async (request, response) => {
  const user = await recoveryPassword.handle(request.body);
  return response.status(204).json(user);
});

usersRouter.post('/reset-password', async (request, response) => {
  const user = await resetPassword.handle(request.body);
  return response.status(204).json(user);
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
