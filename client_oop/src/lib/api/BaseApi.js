class ApiResponse {
  constructor(status, body = {}) {
    this.status = status;
    this.body = body || {};
  }

  isSuccess() {
    return this.status >= 200 && this.status < 300;
  }

  get data() {
    return this.body?.data;
  }

  get errors() {
    return this.body?.errors;
  }

  get paging() {
    return this.body?.paging;
  }

  get errorMessage() {
    const errors = this.errors ?? this.body?.message;

    if (!errors) {
      return 'Unexpected error';
    }

    if (typeof errors === 'string') {
      return errors;
    }

    if (Array.isArray(errors)) {
      return errors.join(', ');
    }

    if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    }

    return String(errors);
  }
}

class BaseApi {
  #baseUrl;

  constructor(baseUrl = import.meta.env.VITE_API_PATH) {
    this.#baseUrl = baseUrl;
  }

  get baseUrl() {
    return this.#baseUrl;
  }

  async request(path, {method = 'GET', body, token, query} = {}) {
    const url = this.#buildUrl(path, query);
    const headers = this.#buildHeaders({token, hasBody: Boolean(body)});

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const responseBody = await response.json().catch(() => ({}));
      return new ApiResponse(response.status, responseBody);
    } catch (error) {
      return new ApiResponse(0, {errors: error.message});
    }
  }

  get(path, options = {}) {
    return this.request(path, {...options, method: 'GET'});
  }

  post(path, body, options = {}) {
    return this.request(path, {...options, method: 'POST', body});
  }

  put(path, body, options = {}) {
    return this.request(path, {...options, method: 'PUT', body});
  }

  patch(path, body, options = {}) {
    return this.request(path, {...options, method: 'PATCH', body});
  }

  delete(path, options = {}) {
    return this.request(path, {...options, method: 'DELETE'});
  }

  #buildUrl(path, query = {}) {
    const sanitizedPath = path.startsWith('/') ? path.substring(1) : path;
    const url = new URL(`${this.#baseUrl}/${sanitizedPath}`);

    Object.entries(query)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== ''
      )
      .forEach(([key, value]) => url.searchParams.append(key, value));

    return url;
  }

  #buildHeaders({token, hasBody}) {
    const headers = {
      Accept: 'application/json',
    };

    if (hasBody) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['Authorization'] = token;
    }

    return headers;
  }
}

class ResourceApi extends BaseApi {
  #resource;

  constructor(resource, baseUrl) {
    super(baseUrl);
    this.#resource = resource;
  }

  get resource() {
    return this.#resource;
  }

  collectionPath(context) {
    return `/${this.#resource}`;
  }

  detailPath(id, context) {
    return `${this.collectionPath(context)}/${id}`;
  }

  list(token, query = {}, context) {
    return this.get(this.collectionPath(context), {token, query});
  }

  create(token, payload, context) {
    return this.post(this.collectionPath(context), payload, {token});
  }

  detail(token, id, context) {
    return this.get(this.detailPath(id, context), {token});
  }

  update(token, id, payload, context) {
    return this.put(this.detailPath(id, context), payload, {token});
  }

  remove(token, id, context) {
    return this.delete(this.detailPath(id, context), {token});
  }

  getInfo() {
    return `Resource API for ${this.#resource}`;
  }
}

export {ApiResponse, BaseApi, ResourceApi};
