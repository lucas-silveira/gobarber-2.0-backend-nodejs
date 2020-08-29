import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@infra/utils/ErrorExcepetion/ErrorExcepetion';
import { IGetUserProfileController } from './GetUserProfileController.interface';

@injectable()
class GetUserProfileController implements IGetUserProfileController {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async handle(
    userId: string,
  ): Promise<IGetUserProfileController.Output> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ErrorExcepetion('error', 'User does not exists.');
    }

    delete user.password;

    return user;
  }
}

export default GetUserProfileController;
