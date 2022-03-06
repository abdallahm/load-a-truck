interface Error {
  name?: string;
  message: string;
}

/**
 * @class ErrorResponse
 */
export default class ErrorResponse {

  constructor(public error: Error) {}

  toJSON() {
    return {
      success: false,
      error: this.error.name as string,
      message: this.error.message as string,
    };
  }
}