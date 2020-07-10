import Authenticate from '@utils/Authentication/Authenticate';
import authConfig from '@configs/auth';
import { IAuthentication } from './VerifyAuthentication.interface';

class VerifyBearerAuthentication implements IAuthentication {
  execute(authHeader: string): IAuthentication.Output | null {
    const [, token] = authHeader.split(' ');
    const { secretKey } = authConfig.jwt;

    return Authenticate.verify(token, secretKey);
  }
}

export default VerifyBearerAuthentication;
