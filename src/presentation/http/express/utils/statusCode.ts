interface StatusCode {
  [attributes: string]: number;
}

const statusCode: StatusCode = {
  error: 400,
  unauthorized: 401,
  forbidden: 403,
};

export default statusCode;
