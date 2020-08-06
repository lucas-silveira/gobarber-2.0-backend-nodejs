export interface IEmailService {
  sendMail: (dto: IEmailService.Input) => Promise<void>;
}

export namespace IEmailService {
  export type Input = {
    email: string;
    subject: string;
    message: string;
  };
}
