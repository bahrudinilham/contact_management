import httpClient from '../api/HTTPClient';

class UserService {
  static async register({name, username, password}) {
    const data = {name, username, password};
    const response = await httpClient.post('/users', data);

    return response;
  }

  static async login({username, password}) {
    const data = {username, password};
    const response = await httpClient.post('/users/login', data);

    return response;
  }

  static async updateUser({name, password}) {
    let data = {};
    let response;

    if (name !== '' && password === '') {
      data = {name};
      response = await httpClient.patch('/users/current', data);
    }

    if (name === '' && password !== '') {
      data = {password};
      response = await httpClient.patch('/users/current', data);
    }

    if (name !== '' && password !== '') {
      data = {name, password};
      response = await httpClient.patch('/users/current', data);
    }

    return response;
  }

  static async userDetail() {
    const response = await httpClient.get('/users/current');

    return response;
  }

  static async logout() {
    const response = await httpClient.delete('/users/logout');

    return response;
  }
}

export default UserService;
