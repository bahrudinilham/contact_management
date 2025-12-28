import contactService from "../service/contact-service.js";
import PagedController from "./paged-controller.js";

// Inheritance: ContactController mewarisi PagedController (yang mewarisi BaseController)
class ContactController extends PagedController {
  constructor(service) {
    super(service);
    this.create = this.handle(this.createContact);
    this.get = this.handle(this.getContact);
    this.update = this.handle(this.updateContact);
    this.remove = this.handle(this.removeContact);
    this.search = this.handle(this.searchContacts);
  }

  async createContact(req) {
    return this.service.create(req.user, req.body);
  }

  async getContact(req) {
    return this.service.get(req.user, req.params.contactId);
  }

  async updateContact(req) {
    return this.service.update(req.user, {
      ...req.body,
      id: req.params.contactId,
    });
  }

  async removeContact(req) {
    await this.service.remove(req.user, req.params.contactId);
    return "OK";
  }

  async searchContacts(req) {
    return this.service.search(req.user, {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size,
    });
  }
}

const contactController = new ContactController(contactService);

export default contactController;
