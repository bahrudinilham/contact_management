import httpClient from '../api/HTTPClient';

class ContactAddressService {
  static async add(contactId, {street, city, province, country, postalCode}) {
    const data = {
      street: street,
      city: city,
      province: province,
      country: country,
      postal_code: postalCode,
    };
    const response = await httpClient.post(
      `/contacts/${contactId}/addresses`,
      data
    );

    return response;
  }

  static async edit(
    contactId,
    addressId,
    {street, city, province, country, postalCode}
  ) {
    const data = {
      street: street,
      city: city,
      province: province,
      country: country,
      postal_code: postalCode,
    };
    const response = await httpClient.put(
      `/contacts/${contactId}/addresses/${addressId}`,
      data
    );

    return response;
  }

  static async getAll(contactId) {
    const response = await httpClient.get(`/contacts/${contactId}/addresses`);

    return response;
  }

  static async getById(contactId, addressId) {
    const response = await httpClient.get(
      `/contacts/${contactId}/addresses/${addressId}`
    );

    return response;
  }

  static async delete(contactId, addressId) {
    const response = await httpClient.delete(
      `/contacts/${contactId}/addresses/${addressId}`
    );

    return response;
  }
}

export default ContactAddressService;
