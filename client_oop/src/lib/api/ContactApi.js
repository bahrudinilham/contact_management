import {ResourceApi} from "./BaseApi.js";

class ContactApi extends ResourceApi {
  constructor() {
    super('contacts');
  }

  createContact(token, payload) {
    return this.create(token, payload);
  }

  getContactList(token, filters) {
    return this.list(token, filters);
  }

  deleteContact(token, id) {
    return this.remove(token, id);
  }

  getContact(token, id) {
    return this.detail(token, id);
  }

  updateContact(token, payload) {
    const {id, ...rest} = payload;
    return this.update(token, id, rest);
  }
}

export const contactApi = new ContactApi();
