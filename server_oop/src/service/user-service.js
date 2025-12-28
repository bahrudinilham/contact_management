import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import BaseService from "./base-service.js";

// Inheritance: UserService mewarisi BaseService
// Mendapatkan akses ke properti prisma dan method validate
class UserService extends BaseService {
  async register(request) {
    const user = this.validate(registerUserValidation, request);

    const countUser = await this.prisma.user.count({
      where: {
        username: user.username,
      },
    });

    if (countUser === 1) {
      throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return this.prisma.user.create({
      data: user,
      select: {
        username: true,
        name: true,
      },
    });
  }

  async login(request) {
    const loginRequest = this.validate(loginUserValidation, request);

    const user = await this.prisma.user.findUnique({
      where: {
        username: loginRequest.username,
      },
      select: {
        username: true,
        password: true,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString();
    return this.prisma.user.update({
      data: {
        token: token,
      },
      where: {
        username: user.username,
      },
      select: {
        token: true,
      },
    });
  }

  async get(username) {
    const validUsername = this.validate(getUserValidation, username);

    const user = await this.prisma.user.findUnique({
      where: {
        username: validUsername,
      },
      select: {
        username: true,
        name: true,
      },
    });

    if (!user) {
      throw new ResponseError(404, "user is not found");
    }

    return user;
  }

  async update(request) {
    const user = this.validate(updateUserValidation, request);

    const totalUserInDatabase = await this.prisma.user.count({
      where: {
        username: user.username,
      },
    });

    if (totalUserInDatabase !== 1) {
      throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.name) {
      data.name = user.name;
    }
    if (user.password) {
      data.password = await bcrypt.hash(user.password, 10);
    }

    return this.prisma.user.update({
      where: {
        username: user.username,
      },
      data: data,
      select: {
        username: true,
        name: true,
      },
    });
  }

  async logout(username) {
    const validUsername = this.validate(getUserValidation, username);

    const user = await this.prisma.user.findUnique({
      where: {
        username: validUsername,
      },
    });

    if (!user) {
      throw new ResponseError(404, "user is not found");
    }

    return this.prisma.user.update({
      where: {
        username: validUsername,
      },
      data: {
        token: null,
      },
      select: {
        username: true,
      },
    });
  }
}

const userService = new UserService();

export { UserService };
export default userService;
