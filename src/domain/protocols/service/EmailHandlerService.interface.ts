export interface ISendMail {
  sendMail: (dto: ISendMail.Message) => Promise<void>;
}

export namespace ISendMail {
  export type Message = {
    email: string;
    subject: string;
    message: string;
  };
}

export type IEmailHandlerService = ISendMail;
