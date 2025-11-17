import {createServer, Model} from 'miragejs';

export default class ServerManager {
  constructor() {
    this.server = null;
  }

  start() {
    this.server = createServer();

    return this.server;
  }

  defineModels() {
    return {
      user: Model,
    };
  }

  seedData(server) {
    server.create('user', {username: 'satu', password: 'satu', name: 'satu'});
    server.create('user', {username: 'dua', password: 'dua', name: 'dua'});
    server.create('user', {username: 'tiga', password: 'tiga', name: 'tiga'});
  }

  defineRoutes() {
    this.namespace = 'api';

    this.post('/users', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.users.create(attrs);
    });

    // this.get('/users', (schema) => {
    //   return schema.users.all();
    // });

    // this.get('/users/:id', (schema, request) => {
    //   const id = request.params.id;
    //   return schema.users.find(id);
    // });

    // this.post('/users', (schema, request) => {
    //   const attrs = JSON.parse(request.requestBody);
    //   return schema.users.create(attrs);
    // });

    // this.put('/users/:id', (schema, request) => {
    //   const id = request.params.id;
    //   const attrs = JSON.parse(request.requestBody);
    //   return schema.users.find(id).update(attrs);
    // });

    // this.delete('/users/:id', (schema, request) => {
    //   const id = request.params.id;
    //   return schema.users.find(id).destroy();
    // });
  }
}
