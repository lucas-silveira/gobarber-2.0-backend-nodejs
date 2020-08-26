import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '12db9e9c290e94',
    pass: '1ef468d1ad6a62',
  },
});

export default transporter;
