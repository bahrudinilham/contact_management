import httpClient from '../api/HTTPClient';

class ContactService {
  static async createContact({firstname, lastname, email, phone}) {
    const data = {
      first_name: firstname,
      last_name: lastname,
      email,
      phone,
    };
    const response = await httpClient.post('/contacts', data);

    return response;
  }

  static async contactList({keywords = '', page = 1}) {
    const params = new URLSearchParams();

    if (keywords) {
      params.append('name', keywords);
    }

    if (page) {
      params.append('page', page);
    }

    const response = await httpClient.get('/contacts', {
      params: params ? params : '',
    });

    return response;
  }

  static async getById(id) {
    if (!id) {
      return alert('Make sure id is exist!');
    }

    const response = await httpClient.get(`/contacts/${id}`);

    return response;
  }

  static async editContact(id, {firstname, lastname, email, phone}) {
    if (!id) {
      return alert('Make sure id is exist!');
    }

    const data = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: phone,
    };
    const response = await httpClient.put(`/contacts/${id}`, data);

    return response;
  }

  static async deleteContact(id) {
    if (!id) {
      return alert('Make sure id is exist!');
    }

    const response = await httpClient.delete(`/contacts/${id}`);

    return response;
  }
}

export default ContactService;
