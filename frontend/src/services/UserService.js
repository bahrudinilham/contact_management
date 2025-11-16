import UserAPI from "../api/UserAPI";

class UserService {
  async fetchUsers(params) {
    return await UserAPI.getUsers(params);
  }

  async fetchUserById(id) {
    return await UserAPI.getUserById(id);
  }

  async createUser(data) {
    return await UserAPI.createUser(data);
  }

  async updateUser(id, data) {
    return await UserAPI.updateUser(id, data);
  }

  async deleteUser(id) {
    return await UserAPI.deleteUser(id);
  }
}

export default new UserService();
