import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";

class BaseService {
  // Encapsulation: Private fields untuk menjaga integritas dependency
  #prisma;
  #validateFn;

  constructor() {
    // Abstraction: Memastikan class ini tidak bisa di-instance langsung (Abstract Class)
    if (new.target === BaseService) {
      throw new Error(
        "BaseService is abstract and cannot be instantiated directly"
      );
    }
    this.#prisma = prismaClient;
    this.#validateFn = validate;
  }

  // Encapsulation: Getter untuk mengakses private property secara aman
  get prisma() {
    return this.#prisma;
  }

  validate(schema, payload) {
    return this.#validateFn(schema, payload);
  }
}

export default BaseService;
