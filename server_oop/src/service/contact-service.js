import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import ContactOwnedService from "./contact-owned-service.js";

// Inheritance: ContactService mewarisi ContactOwnedService
// (yang pada gilirannya mewarisi BaseService)
class ContactService extends ContactOwnedService {
  async create(user, request) {
    const contact = this.validate(createContactValidation, request);
    contact.username = user.username;

    return this.prisma.contact.create({
      data: contact,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });
  }

  async get(user, contactId) {
    return this.findContactOrThrow(user, contactId);
  }

  async update(user, request) {
    const contact = this.validate(updateContactValidation, request);

    await this.findContactOrThrow(user, contact.id, { id: true });

    return this.prisma.contact.update({
      where: {
        id: contact.id,
      },
      data: {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });
  }

  async remove(user, contactId) {
    const existingContact = await this.findContactOrThrow(user, contactId, {
      id: true,
    });

    await this.prisma.address.deleteMany({
      where: {
        contact_id: existingContact.id,
      },
    });

    return this.prisma.contact.delete({
      where: {
        id: existingContact.id,
      },
    });
  }

  async search(user, request) {
    const searchRequest = this.validate(searchContactValidation, request);
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters = [
      {
        username: user.username,
      },
    ];

    if (searchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.name,
            },
          },
          {
            last_name: {
              contains: searchRequest.name,
            },
          },
        ],
      });
    }
    if (searchRequest.email) {
      filters.push({
        email: {
          contains: searchRequest.email,
        },
      });
    }
    if (searchRequest.phone) {
      filters.push({
        phone: {
          contains: searchRequest.phone,
        },
      });
    }

    const contacts = await this.prisma.contact.findMany({
      where: {
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const totalItems = await this.prisma.contact.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: contacts,
      paging: {
        page: searchRequest.page,
        total_item: totalItems,
        total_page: Math.ceil(totalItems / searchRequest.size),
      },
    };
  }
}

const contactService = new ContactService();

export { ContactService };
export default contactService;
