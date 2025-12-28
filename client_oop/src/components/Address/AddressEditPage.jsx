import React from 'react';
import {Link} from 'react-router-dom';
import BaseComponent from '../BaseComponent.jsx';
import {contactApi} from '../../lib/api/ContactApi.js';
import {addressApi} from '../../lib/api/AddressApi.js';
import {alertService} from '../../lib/alert.js';
import {withRouter} from '../../lib/withRouter.jsx';

class AddressEditPage extends BaseComponent {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token') || '';
    const id = props.params.id;
    const addressId = props.params.addressId;
    this.state = {
      token,
      id,
      addressId,
      contact: {},
      street: '',
      city: '',
      province: '',
      country: '',
      postal_code: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchContact = this.fetchContact.bind(this);
    this.fetchAddress = this.fetchAddress.bind(this);
  }

  componentDidMount() {
    this.fetchContact();
    this.fetchAddress();
  }

  async fetchContact() {
    const {token, id} = this.state;
    const response = await contactApi.getContact(token, id);
    if (response.isSuccess()) {
      this.setStatePartial({contact: response.data});
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  async fetchAddress() {
    const {token, id, addressId} = this.state;
    const response = await addressApi.getAddress(token, id, addressId);
    if (response.isSuccess()) {
      const {street, city, province, country, postal_code} = response.data;
      this.setStatePartial({street, city, province, country, postal_code});
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {token, id, addressId, street, city, province, country, postal_code} =
      this.state;
    const response = await addressApi.updateAddress(token, id, {
      id: addressId,
      street,
      city,
      province,
      country,
      postal_code,
    });
    if (response.isSuccess()) {
      await alertService.success('Address updated successfully');
      this.props.navigate(`/dashboard/contacts/${id}`);
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  render() {
    const {contact, street, city, province, country, postal_code, id} =
      this.state;
    return (
      <>
        <div className="flex items-center mb-6">
          <Link
            to={`/dashboard/contacts/${id}`}
            className="text-purple-600 hover:text-purple-700 mr-4 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-left mr-2"></i> Back to Contact Details
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-map-marker-alt text-white text-sm"></i>
            </div>
            Edit Address
          </h1>
        </div>
        <div className="glass-card gradient-border rounded-xl shadow-xl overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient rounded-full flex items-center justify-center mr-4 shadow-md">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {contact.first_name} {contact.last_name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {contact.email} • {contact.phone}
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="street"
                  className="block text-gray-600 text-sm font-medium mb-2">
                  Street
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-road text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                    placeholder="Enter street address"
                    required
                    value={street}
                    onChange={(e) =>
                      this.setStatePartial({street: e.target.value})
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-gray-600 text-sm font-medium mb-2">
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-city text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter city"
                      required
                      value={city}
                      onChange={(e) =>
                        this.setStatePartial({city: e.target.value})
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="province"
                    className="block text-gray-600 text-sm font-medium mb-2">
                    Province/State
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-map text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter province or state"
                      required
                      value={province}
                      onChange={(e) =>
                        this.setStatePartial({province: e.target.value})
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-gray-600 text-sm font-medium mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-flag text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter country"
                      required
                      value={country}
                      onChange={(e) =>
                        this.setStatePartial({country: e.target.value})
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="postal_code"
                    className="block text-gray-600 text-sm font-medium mb-2">
                    Postal Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-mail-bulk text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter postal code"
                      required
                      value={postal_code}
                      onChange={(e) =>
                        this.setStatePartial({postal_code: e.target.value})
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Link
                  to={`/dashboard/contacts/${id}`}
                  className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center shadow-sm">
                  <i className="fas fa-times mr-2"></i> Cancel
                </Link>
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                  <i className="fas fa-save mr-2"></i> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const AddressEditPageWithRouter = withRouter(AddressEditPage);

export default AddressEditPageWithRouter;
