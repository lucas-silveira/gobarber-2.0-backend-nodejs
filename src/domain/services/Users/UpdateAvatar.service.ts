import IUserRepository from '@src/infra/repositories/UserRepository.interface';
import { IUpdateAvatarService } from './UpdateAvatar.interface';

class UpdateAvatar implements IUpdateAvatarService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({
    userId,
    avatarName,
  }: IUpdateAvatarService.Input): Promise<IUpdateAvatarService.Output> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) throw new Error('Only authenticated users can change avatar.');

    user.avatar = avatarName;
    await this.userRepository.update(user);
  }
}

export default UpdateAvatar;
