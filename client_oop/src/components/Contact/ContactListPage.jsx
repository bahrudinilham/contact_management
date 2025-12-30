import React from "react";
import { Link } from "react-router-dom";
import BaseComponent from "../BaseComponent.jsx";
import { contactApi } from "../../lib/api/ContactApi.js";
import { alertService } from "../../lib/alert.js";

class ContactListPage extends BaseComponent {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token") || "";
    this.state = {
      token,
      searchQuery: "",
      contacts: [],
      isLoading: true,
    };
    this.handleSearchContacts = this.handleSearchContacts.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
    this.handleContactDelete = this.handleContactDelete.bind(this);
  }

  componentDidMount() {
    this.fetchContacts();
  }

  async fetchContacts() {
    const { token, searchQuery } = this.state;
    this.setStatePartial({ isLoading: true });
    const response = await contactApi.getContactList(token, {
      name: searchQuery,
    });
    if (response.isSuccess()) {
      this.setStatePartial({
        contacts: response.data ?? [],
        isLoading: false,
      });
    } else {
      this.setStatePartial({ isLoading: false });
      await alertService.error(response.errorMessage);
    }
  }

  async handleSearchContacts(e) {
    e.preventDefault();
    await this.fetchContacts();
  }

  async handleContactDelete(id) {
    if (
      !(await alertService.confirm(
        "Are you sure you want to delete this contact?"
      ))
    ) {
      return;
    }
    const { token } = this.state;
    const response = await contactApi.deleteContact(token, id);
    if (response.isSuccess()) {
      await alertService.success("Contact deleted successfully");
      await this.fetchContacts();
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  render() {
    const { searchQuery, contacts, isLoading } = this.state;

    return (
      <>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient rounded-lg flex items-center justify-center mr-3 shadow-md">
              <i className="fas fa-users text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">My Contacts</h1>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <form
              onSubmit={this.handleSearchContacts}
              className="flex items-center flex-1 md:flex-none"
            >
              <div className="relative flex-1 md:flex-none">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="search_contacts"
                  className="w-full md:w-64 pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 input-glow transition-all duration-200 shadow-sm"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) =>
                    this.setStatePartial({ searchQuery: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="ml-3 px-5 py-3 bg-gradient text-white rounded-xl hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
            <Link
              to="/dashboard/contacts/create"
              className="px-5 py-3 bg-gradient text-white rounded-xl hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center whitespace-nowrap"
            >
              <i className="fas fa-plus mr-2"></i> New Contact
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="glass-card gradient-border rounded-2xl p-12 text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg pulse-glow">
                <i className="fas fa-user-friends text-4xl text-white"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                No contacts yet
              </h2>
              <p className="text-gray-500 mb-8">
                Start building your network by adding your first contact.
              </p>
              <Link
                to="/dashboard/contacts/create"
                className="inline-flex items-center px-6 py-3 bg-gradient text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <i className="fas fa-plus mr-2"></i> Add First Contact
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="glass-card gradient-border rounded-xl shadow-md overflow-hidden card-hover animate-stagger"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <Link
                      to={`/dashboard/contacts/${contact.id}`}
                      className="block cursor-pointer hover:opacity-90 transition-all duration-200"
                    >
                      <div className="flex items-center mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-200">
                            {contact.first_name} {contact.last_name}
                          </h2>
                          <p className="text-gray-500 text-sm">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-4 pl-1">
                        <i className="fas fa-phone text-purple-500 mr-2"></i>
                        <span>{contact.phone}</span>
                      </div>
                    </Link>
                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                      <Link
                        to={`/dashboard/contacts/${contact.id}/edit`}
                        className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 text-sm font-medium shadow-md flex items-center"
                      >
                        <i className="fas fa-edit mr-1"></i> Edit
                      </Link>
                      <button
                        onClick={() => this.handleContactDelete(contact.id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 text-sm font-medium shadow-md flex items-center"
                      >
                        <i className="fas fa-trash-alt mr-1"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default ContactListPage;
