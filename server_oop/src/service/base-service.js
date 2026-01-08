import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";

class BaseService {
  #prisma;
  #validateFn;

  constructor() {
    if (new.target === BaseService) {
      throw new Error(
        "BaseService is abstract and cannot be instantiated directly"
      );
    }
    this.#prisma = prismaClient;
    this.#validateFn = validate;
  }

  get prisma() {
    return this.#prisma;
  }

  validate(schema, payload) {
    return this.#validateFn(schema, payload);
  }
}

export default BaseService;
