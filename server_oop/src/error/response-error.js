// Inheritance: Mewarisi class Error bawaan JS untuk custom error handling
class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export { ResponseError };
