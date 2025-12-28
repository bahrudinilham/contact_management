import ContactOwnedService from "./contact-owned-service.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";

// Inheritance: AddressService mewarisi ContactOwnedService
// Hal ini memungkinkan penggunaan method 'findContactOrThrow' yang didefinisikan di parent class
class AddressService extends ContactOwnedService {
  async create(user, contactId, request) {
    const contact = await this.findContactOrThrow(user, contactId, {
      id: true,
    });

    const address = this.validate(createAddressValidation, request);
    address.contact_id = contact.id;

    return this.prisma.address.create({
      data: address,
      select: {
        id: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      },
    });
  }

  async findAddressOrThrow(
    contactId,
    addressId,
    select = {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  ) {
    const validAddressId = this.validate(getAddressValidation, addressId);

    const address = await this.prisma.address.findFirst({
      where: {
        contact_id: contactId,
        id: validAddressId,
      },
      select,
    });

    if (!address) {
      throw new ResponseError(404, "address is not found");
    }

    return address;
  }

  async get(user, contactId, addressId) {
    const contact = await this.findContactOrThrow(user, contactId, {
      id: true,
    });

    return this.findAddressOrThrow(contact.id, addressId);
  }

  async update(user, contactId, request) {
    const contact = await this.findContactOrThrow(user, contactId, {
      id: true,
    });
    const address = this.validate(updateAddressValidation, request);

    await this.findAddressOrThrow(contact.id, address.id, { id: true });

    return this.prisma.address.update({
      where: {
        id: address.id,
      },
      data: {
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
      },
      select: {
        id: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      },
    });
  }

  async remove(user, contactId, addressId) {
    const contact = await this.findContactOrThrow(user, contactId, {
      id: true,
    });
    const address = await this.findAddressOrThrow(contact.id, addressId, {
      id: true,
    });

    return this.prisma.address.delete({
      where: {
        id: address.id,
      },
    });
  }

  async list(user, contactId) {
    const contact = await this.findContactOrThrow(user, contactId, {
      id: true,
    });

    return this.prisma.address.findMany({
      where: {
        contact_id: contact.id,
      },
      select: {
        id: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      },
    });
  }
}

const addressService = new AddressService();

export { AddressService };
export default addressService;
