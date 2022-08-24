export default interface ErrorHandler {
  response: {
    status: number;
    statusText: string;
  };
}
