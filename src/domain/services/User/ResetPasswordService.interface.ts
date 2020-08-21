import IService from '../Service.interface';

export type IResetPasswordService = IService<
  IResetPasswordService.Input,
  Promise<void>
>;

export namespace IResetPasswordService {
  export type Input = {
    token: string;
    password: string;
  };
}
