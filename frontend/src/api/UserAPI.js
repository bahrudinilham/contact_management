import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {
  constructor() {
    super({baseURL: 'https://jsonplaceholder.typicode.com'}); // ganti sesuai backend
  }

  getUsers(params) {
    return this.get('/users', params);
  }

  getUserById(id) {
    return this.get(`/users/${id}`);
  }

  createUser(payload) {
    return this.post('/users', payload);
  }

  updateUser(id, payload) {
    return this.put(`/users/${id}`, payload);
  }

  deleteUser(id) {
    return this.delete(`/users/${id}`);
  }
}

export default new UserAPI();
