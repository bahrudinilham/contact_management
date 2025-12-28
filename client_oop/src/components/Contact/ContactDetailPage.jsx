import React from "react";
import { Link } from "react-router-dom";
import BaseComponent from "../BaseComponent.jsx";
import { contactApi } from "../../lib/api/ContactApi.js";
import { addressApi } from "../../lib/api/AddressApi.js";
import { alertService } from "../../lib/alert.js";
import { withRouter } from "../../lib/withRouter.jsx";

class ContactDetailPage extends BaseComponent {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token") || "";
    const id = props.params.id;
    this.state = { token, id, contact: {}, addresses: [] };
    this.fetchContact = this.fetchContact.bind(this);
    this.fetchAddresses = this.fetchAddresses.bind(this);
    this.handleDeleteAddress = this.handleDeleteAddress.bind(this);
  }

  componentDidMount() {
    this.fetchContact();
    this.fetchAddresses();
  }

  async fetchContact() {
    const { token, id } = this.state;
    const response = await contactApi.getContact(token, id);
    if (response.isSuccess()) {
      this.setStatePartial({ contact: response.data });
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  async fetchAddresses() {
    const { token, id } = this.state;
    const response = await addressApi.getAddressList(token, id);
    if (response.isSuccess()) {
      this.setStatePartial({ addresses: response.data ?? [] });
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  async handleDeleteAddress(addressId) {
    if (
      !(await alertService.confirm(
        "Are you sure you want to delete this address?"
      ))
    )
      return;
    const { token, id } = this.state;
    const response = await addressApi.deleteAddress(token, id, addressId);
    if (response.isSuccess()) {
      await alertService.success("Address deleted successfully");
      await this.fetchAddresses();
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  render() {
    const { contact, addresses, id } = this.state;

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
              <i className="fas fa-id-card text-white text-sm"></i>
            </div>
            Contact Details
          </h1>
        </div>

        <div className="glass-card gradient-border rounded-xl shadow-xl overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {contact.first_name} {contact.last_name}
              </h2>
              <div className="w-24 h-1 bg-gradient mx-auto rounded-full"></div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-user-tag text-purple-500 mr-2"></i>
                    <h3 className="text-gray-500 text-sm font-medium">
                      First Name
                    </h3>
                  </div>
                  <p className="text-gray-800 text-lg ml-6">
                    {contact.first_name}
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-user-tag text-purple-500 mr-2"></i>
                    <h3 className="text-gray-500 text-sm font-medium">
                      Last Name
                    </h3>
                  </div>
                  <p className="text-gray-800 text-lg ml-6">
                    {contact.last_name}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center mb-2">
                  <i className="fas fa-envelope text-cyan-500 mr-2"></i>
                  <h3 className="text-gray-500 text-sm font-medium">Email</h3>
                </div>
                <p className="text-gray-800 text-lg ml-6">{contact.email}</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center mb-2">
                  <i className="fas fa-phone text-cyan-500 mr-2"></i>
                  <h3 className="text-gray-500 text-sm font-medium">Phone</h3>
                </div>
                <p className="text-gray-800 text-lg ml-6">{contact.phone}</p>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-center mb-5">
                <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-map-marker-alt text-white text-sm"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Addresses
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gray-50 p-5 rounded-xl border-2 border-dashed border-purple-300 card-hover pulse-glow">
                  <Link
                    to={`/dashboard/contacts/${id}/addresses/create`}
                    className="block h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full text-center py-4">
                      <div className="w-14 h-14 bg-gradient-accent rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-plus text-xl text-white"></i>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Add Address
                      </h4>
                    </div>
                  </Link>
                </div>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-gray-50 p-5 rounded-xl border border-gray-100 card-hover"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient rounded-full flex items-center justify-center mr-3 shadow-md">
                        <i className="fas fa-home text-white"></i>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Address
                      </h4>
                    </div>
                    <div className="space-y-2 text-gray-600 ml-2 mb-4 text-sm">
                      <p className="flex items-center">
                        <i className="fas fa-road text-gray-400 w-5"></i>
                        <span className="ml-2">{address.street}</span>
                      </p>
                      <p className="flex items-center">
                        <i className="fas fa-city text-gray-400 w-5"></i>
                        <span className="ml-2">
                          {address.city}, {address.province}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <i className="fas fa-flag text-gray-400 w-5"></i>
                        <span className="ml-2">
                          {address.country} {address.postal_code}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/dashboard/contacts/${id}/addresses/${address.id}/edit`}
                        className="px-3 py-2 bg-gradient text-white rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-md flex items-center"
                      >
                        <i className="fas fa-edit mr-1"></i> Edit
                      </Link>
                      <button
                        onClick={() => this.handleDeleteAddress(address.id)}
                        className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-md flex items-center"
                      >
                        <i className="fas fa-trash-alt mr-1"></i> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Link
                to="/dashboard/contacts"
                className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center shadow-sm"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back
              </Link>
              <Link
                to={`/dashboard/contacts/${id}/edit`}
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <i className="fas fa-user-edit mr-2"></i> Edit Contact
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const ContactDetailPageWithRouter = withRouter(ContactDetailPage);

export default ContactDetailPageWithRouter;
