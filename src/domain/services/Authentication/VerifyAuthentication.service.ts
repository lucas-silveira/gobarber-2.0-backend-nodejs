import { injectable, inject } from 'tsyringe';
import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IVerifyAuthenticationService } from './VerifyAuthenticationService.interface';

@injectable()
class VerifyAuthenticationService implements IVerifyAuthenticationService {
  private readonly authenticate: IAuthenticateUtil;

  constructor(
    @inject('AuthenticateUtil')
    authenticate: IAuthenticateUtil,
  ) {
    this.authenticate = authenticate;
  }

  public execute(authHeader: string): string {
    const [, token] = authHeader.split(' ');

    const userId = this.authenticate.verifyAndReturnUserID(token);

    if (!userId)
      throw new ErrorExcepetion(
        'unauthorized',
        'You must be authenticated to access this feature.',
      );

    return userId;
  }
}

export default VerifyAuthenticationService;
