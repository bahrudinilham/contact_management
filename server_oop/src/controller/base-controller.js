class BaseController {
  // Encapsulation: Menggunakan private field (#service) untuk membungkus dependency service
  // agar tidak bisa diakses langsung dari luar class ini tanpa melalui getter/setter
  #service;

  constructor(service = null) {
    // Abstraction: Mencegah instansiasi langsung dari BaseController,
    // menjadikannya semacam "Abstract Class" yang hanya boleh di-inherit
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

  // Polymorphism & Reusability: Method ini bersifat generic dan bisa digunakan
  // oleh berbagai controller turunan untuk menangani logic request dengan cara yang seragam.
  handle(executor, { status = 200 } = {}) {
    return async (req, res, next) => {
      try {
        // `this` disini akan merujuk pada instance dari subclass (misal UserController),
        // sehingga executor memiliki akses kontekstual yang benar.
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
