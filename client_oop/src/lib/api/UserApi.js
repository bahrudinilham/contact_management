import {BaseApi} from "./BaseApi.js";

class UserApi extends BaseApi {
  register(payload) {
    return this.post('/users', payload);
  }

  login(payload) {
    return this.post('/users/login', payload);
  }

  updateProfile(token, payload) {
    return this.patch('/users/current', payload, {token});
  }

  updatePassword(token, payload) {
    return this.patch('/users/current', payload, {token});
  }

  detail(token) {
    return this.get('/users/current', {token});
  }

  logout(token) {
    return this.delete('/users/logout', {token});
  }
}

export const userApi = new UserApi();
