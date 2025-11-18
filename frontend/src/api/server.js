import {createServer, Model, Response} from 'miragejs';

class MirageAppServer {
  constructor() {
    this.server = null;
    this.start();
  }

  start() {
    this.server = createServer({
      models: {
        user: Model,
      },

      seeds: (server) => this.seeds(server),

      routes: () => this.routes(),
    });
  }

  seeds(server) {
    server.create('user', {
      name: 'ana',
      username: 'analoli',
      password: 'analoli',
    });
  }

  routes() {
    this.server.namespace = '/api';

    this.server.post('/register', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      if (!data.email || !data.password) {
        return new Response(
          400,
          {},
          {message: 'Email dan password wajib diisi!'}
        );
      }

      const user = schema.users.create(data);

      return new Response(
        201,
        {},
        {message: 'Registrasi berhasil!', data: user}
      );
    });
  }
}

new MirageAppServer();
