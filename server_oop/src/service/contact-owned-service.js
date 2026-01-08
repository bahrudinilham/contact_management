import BaseService from "./base-service.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { ResponseError } from "../error/response-error.js";

class ContactOwnedService extends BaseService {
  async findContactOrThrow(
    user,
    contactId,
    select = {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  ) {
    const validContactId = this.validate(getContactValidation, contactId);

    const contact = await this.prisma.contact.findFirst({
      where: {
        username: user.username,
        id: validContactId,
      },
      select,
    });

    if (!contact) {
      throw new ResponseError(404, "contact is not found");
    }

    return contact;
  }
}

export default ContactOwnedService;
