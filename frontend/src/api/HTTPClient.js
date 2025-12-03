import axios from 'axios';
import Constant from '../libs/helpers/Constant';

class HttpClient {
  #instance;

  constructor(baseURL = Constant.apiBaseUrl) {
    this.#instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.#instance.interceptors.request.use(
      (config) => {
        let token = window.localStorage.getItem('token');

        if (token) {
          token = `${token.replace(/["\\]/g, '').trim()}`;

          config.headers['Authorization'] = token;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.#instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized login');
          // window.location.href = '/login';
        }

        return Promise.reject(error);
      }
    );
  }

  get(url, config = {}) {
    return this.#instance.get(url, config);
  }

  post(url, data, config = {}) {
    return this.#instance.post(url, data, config);
  }

  patch(url, data, config = {}) {
    return this.#instance.patch(url, data, config);
  }

  put(url, data, config = {}) {
    return this.#instance.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.#instance.delete(url, config);
  }
}

const httpClient = new HttpClient();

export default httpClient;
