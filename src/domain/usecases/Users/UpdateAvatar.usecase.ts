import IUserRepository from '@domain/protocols/repository/UserRepository.interface';
import { IStorageHandler } from '@domain/protocols/utils/StorageHandler.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IUpdateAvatar } from './UpdateAvatar.interface';

class UpdateAvatar implements IUpdateAvatar {
  private userRepository: IUserRepository;

  private storageHandler: IStorageHandler;

  constructor(
    userRepository: IUserRepository,
    storageHandler: IStorageHandler,
  ) {
    this.userRepository = userRepository;
    this.storageHandler = storageHandler;
  }

  public async execute({
    userId,
    avatarName,
  }: IUpdateAvatar.Input): Promise<IUpdateAvatar.Output> {
    const user = await this.userRepository.findById(userId);

    if (!user)
      throw new ErrorExcepetion(
        'unauthorized',
        'Only authenticated users can change avatar.',
      );

    if (user.avatar) {
      await this.storageHandler.deleteFile('uploads', user.avatar);
    }

    await this.storageHandler.saveFile('uploads', avatarName);

    user.avatar = avatarName;
    await this.userRepository.update(user);
  }
}

export default UpdateAvatar;
