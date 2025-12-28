import { ResourceApi } from "./BaseApi.js";

class AddressApi extends ResourceApi {
  constructor() {
    super('addresses');
  }

  collectionPath(contactId) {
    return `/contacts/${contactId}/addresses`;
  }

  detailPath(id, contactId) {
    return `${this.collectionPath(contactId)}/${id}`;
  }

  createAddress(token, contactId, payload) {
    return this.create(token, payload, contactId);
  }

  getAddressList(token, contactId) {
    return this.list(token, {}, contactId);
  }

  getAddress(token, contactId, id) {
    return this.detail(token, id, contactId);
  }

  updateAddress(token, contactId, payload) {
    const { id, ...rest } = payload;
    return this.update(token, id, rest, contactId);
  }

  deleteAddress(token, contactId, id) {
    return this.remove(token, id, contactId);
  }

  getInfo() {
    return "Address Specific API Utility";
  }
}

export const addressApi = new AddressApi();
