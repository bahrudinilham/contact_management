import React from "react";
import { Link } from "react-router-dom";
import BaseComponent from "../BaseComponent.jsx";
import { contactApi } from "../../lib/api/ContactApi.js";
import { alertService } from "../../lib/alert.js";
import { withRouter } from "../../lib/withRouter.jsx";

class ContactCreatePage extends BaseComponent {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token") || "";
    this.state = { token, first_name: "", last_name: "", email: "", phone: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { token, first_name, last_name, email, phone } = this.state;
    const response = await contactApi.createContact(token, {
      first_name,
      last_name,
      email,
      phone,
    });
    if (response.isSuccess()) {
      await alertService.success("Contact created successfully");
      this.props.navigate("/dashboard/contacts");
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  render() {
    const { first_name, last_name, email, phone } = this.state;
    return (
      <>
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard/contacts"
            className="text-purple-600 hover:text-purple-700 mr-4 flex items-center transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Contacts
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-user-plus text-white text-sm"></i>
            </div>
            Create New Contact
          </h1>
        </div>
        <div className="glass-card gradient-border rounded-xl shadow-xl overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            <form onSubmit={this.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user-tag text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter first name"
                      required
                      value={first_name}
                      onChange={(e) =>
                        this.setStatePartial({ first_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user-tag text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter last name"
                      required
                      value={last_name}
                      onChange={(e) =>
                        this.setStatePartial({ last_name: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white input-glow transition-all duration-200"
                    placeholder="Enter email address"
                    required
                    value={email}
                    onChange={(e) =>
                      this.setStatePartial({ email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-phone text-gray-400"></i>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white input-glow transition-all duration-200"
                    placeholder="Enter phone number"
                    required
                    value={phone}
                    onChange={(e) =>
                      this.setStatePartial({ phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Link
                  to="/dashboard/contacts"
                  className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center shadow-sm"
                >
                  <i className="fas fa-times mr-2"></i> Cancel
                </Link>
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Create Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const ContactCreatePageWithRouter = withRouter(ContactCreatePage);

export default ContactCreatePageWithRouter;
