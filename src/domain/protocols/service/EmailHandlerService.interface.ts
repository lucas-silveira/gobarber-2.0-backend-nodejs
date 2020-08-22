export interface IEmailHandlerService {
  sendMail: (dto: IEmailHandlerService.Input) => Promise<void>;
}

export namespace IEmailHandlerService {
  export type Input = {
    email: string;
    subject: string;
    message: string;
  };
}
