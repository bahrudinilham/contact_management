import BaseController from "./base-controller.js";

// Inheritance: PagedController mewarisi BaseController
class PagedController extends BaseController {
  // Polymorphism: Meng-override formatResponse untuk menangani response paging
  formatResponse(result) {
    if (result && Object.prototype.hasOwnProperty.call(result, "paging")) {
      return {
        data: result.data,
        paging: result.paging,
      };
    }

    return super.formatResponse(result);
  }
}

export default PagedController;
