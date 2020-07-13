import IUserRepository from '@infra/repositories/UserRepository.interface';
import { IStorageHandler } from '@utils/StorageHandler/StorageHandler.interface';
import { IUpdateAvatarService } from './UpdateAvatar.interface';

class UpdateAvatar implements IUpdateAvatarService {
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
  }: IUpdateAvatarService.Input): Promise<IUpdateAvatarService.Output> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user)
      throw new Error(
        'unauthorized:Only authenticated users can change avatar.',
      );

    if (user.avatar) {
      const avatarFileExists = await this.storageHandler.hasFile(
        'tmp',
        user.avatar,
      );

      if (avatarFileExists)
        await this.storageHandler.deleteFile('tmp', user.avatar);
    }

    user.avatar = avatarName;
    await this.userRepository.update(user);
  }
}

export default UpdateAvatar;
