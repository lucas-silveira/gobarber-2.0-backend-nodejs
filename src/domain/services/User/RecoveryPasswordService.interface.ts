import IService from '../Service.interface';

export type IRecoveryPasswordService = IService<
  IRecoveryPasswordService.Input,
  Promise<void>
>;

export namespace IRecoveryPasswordService {
  export type Input = {
    email: string;
  };
}
