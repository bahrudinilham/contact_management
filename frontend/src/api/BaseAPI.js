import axios from 'axios';

class BaseAPI {
  constructor({baseUrl = '', timeout = 10000}) {
    this.clients = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
    });

    this.clients.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    this.clients.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get(url, params) {
    const response = await this.clients.get(url, {params: params});
    return response.data;
  }

  async post(url, data) {
    const response = await this.clients.post(url, data);
    return response.data;
  }

  async put(url, data) {
    const response = await this.clients.put(url, data);
    return response.data;
  }

  async delete(url) {
    const response = await this.clients.delete(url);
    return response.data;
  }
}

export default BaseAPI;
