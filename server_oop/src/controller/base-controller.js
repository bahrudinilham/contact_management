class BaseController {
  #service;

  constructor(service = null) {
    if (new.target === BaseController) {
      throw new Error(
        "BaseController is abstract and cannot be instantiated directly"
      );
    }
    this.#service = service;
  }

  get service() {
    return this.#service;
  }

  formatResponse(result) {
    return {
      data: result,
    };
  }

  writeResponse(res, body, status = 200) {
    res.status(status).json(body);
  }

  handle(executor, { status = 200 } = {}) {
    return async (req, res, next) => {
      try {
        const result = await executor.call(this, req);
        const formatted = this.formatResponse(result);
        this.writeResponse(res, formatted, status);
      } catch (e) {
        next(e);
      }
    };
  }
}

export default BaseController;
