import userService from "../service/user-service.js";
import BaseController from "./base-controller.js";

// Inheritance: UserController mewarisi method dan properti dari BaseController
class UserController extends BaseController {
  constructor(service) {
    super(service);
    this.register = this.handle(this.registerUser);
    this.login = this.handle(this.loginUser);
    this.get = this.handle(this.getCurrentUser);
    this.update = this.handle(this.updateCurrentUser);
    this.logout = this.handle(this.logoutUser);
  }

  async registerUser(req) {
    return this.service.register(req.body);
  }

  async loginUser(req) {
    return this.service.login(req.body);
  }

  async getCurrentUser(req) {
    return this.service.get(req.user.username);
  }

  async updateCurrentUser(req) {
    return this.service.update({
      ...req.body,
      username: req.user.username,
    });
  }

  async logoutUser(req) {
    await this.service.logout(req.user.username);
    return "OK";
  }
}

const userController = new UserController(userService);

export default userController;
