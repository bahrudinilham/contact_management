import BaseController from "./base-controller.js";

// Inheritance: HealthController mewarisi BaseController
class HealthController extends BaseController {
  constructor() {
    super();
    this.ping = this.handle(this.pingApp);
  }

  async pingApp() {
    return "PONG";
  }

  // Polymorphism: Meng-override method formatResponse dari BaseController
  formatResponse(result) {
    return result;
  }

  // Polymorphism: Meng-override method writeResponse dari BaseController
  writeResponse(res, body, status = 200) {
    res.status(status).send(body);
  }
}

const healthController = new HealthController();

export default healthController;
