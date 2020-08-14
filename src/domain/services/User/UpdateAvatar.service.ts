import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IStorageHandler } from '@domain/protocols/utils/StorageHandler.interface';
import { IUpdateAvatarService } from './UpdateAvatarService.interface';

class UpdateAvatarService implements IUpdateAvatarService {
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
  }: IUpdateAvatarService.Input): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new ErrorExcepetion('error', 'User ID is incorrect.');
    if (user.avatar) {
      await this.storageHandler.deleteFile('uploads', user.avatar);
    }

    await this.storageHandler.saveFile('uploads', avatarName);
    user.avatar = avatarName;
    await this.userRepository.update(user);
  }
}

export default UpdateAvatarService;
