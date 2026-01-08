import addressService from "../service/address-service.js";
import BaseController from "./base-controller.js";

class AddressController extends BaseController {
  constructor(service) {
    super(service);
    this.create = this.handle(this.createAddress);
    this.get = this.handle(this.getAddress);
    this.update = this.handle(this.updateAddress);
    this.remove = this.handle(this.removeAddress);
    this.list = this.handle(this.listAddresses);
  }

  async createAddress(req) {
    return this.service.create(req.user, req.params.contactId, req.body);
  }

  async getAddress(req) {
    return this.service.get(
      req.user,
      req.params.contactId,
      req.params.addressId
    );
  }

  async updateAddress(req) {
    return this.service.update(req.user, req.params.contactId, {
      ...req.body,
      id: req.params.addressId,
    });
  }

  async removeAddress(req) {
    await this.service.remove(
      req.user,
      req.params.contactId,
      req.params.addressId
    );
    return "OK";
  }

  async listAddresses(req) {
    return this.service.list(req.user, req.params.contactId);
  }
}

const addressController = new AddressController(addressService);

export default addressController;
