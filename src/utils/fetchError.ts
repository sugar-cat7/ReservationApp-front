export const FetchError = (status: number) => {
  let message: string;
  switch (status) {
    case 401:
      message = 'authentication failed';
      break;
    case 500:
      message = 'Internal Error';
      break;
    default:
      message = 'Error';
      break;
  }
  return message;
};
