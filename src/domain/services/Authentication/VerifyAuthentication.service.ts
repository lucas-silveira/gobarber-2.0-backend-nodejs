import Authenticate from '@utils/Authentication/Authenticate';
import authConfig from '@configs/auth';
import { IAuthentication } from './VerifyAuthentication.interface';

class VerifyBearerAuthentication implements IAuthentication {
  execute(authHeader: string): IAuthentication.Output {
    const [, token] = authHeader.split(' ');
    const { secretKey } = authConfig.jwt;

    const authResponse = Authenticate.verify(token, secretKey);

    if (!authResponse) throw new Error("You don't have authorization.");

    return authResponse;
  }
}

export default VerifyBearerAuthentication;
