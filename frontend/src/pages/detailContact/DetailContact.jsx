import {Component} from 'react';
import style from './style.module.css';

// Components
import Header from '../../components/ui/headerContent/HeaderContent';
import ContactAddressCard from '../../components/ui/contactAddressCard/ContactAddressCard';
import EditContactForm from '../../components/ui/editContactForm/EditContactForm';

// Icons
import {FaPencilAlt, FaPlus, FaTimes} from 'react-icons/fa';
import {Link} from 'react-router';

// Others
import ContactService from '../../services/ContactService';
import ContactAddressService from '../../services/ContactAddressService';

import withHooks from '../../libs/hoc/withHooks';
import {detailContactHookMapper} from '../../libs/hooksMappers';

class DetailContact extends Component {
  constructor() {
    super();

    this.state = {
      isEditMode: false,
      detailId: '',

      firstname: '',
      lastname: '',
      email: '',
      phone: '',

      addressList: [],

      isReload: false,
    };

    this.editModeSwitcher = this.editModeSwitcher.bind(this);
    this.getContactById = this.getContactById.bind(this);
    this.reloadToggle = this.reloadToggle.bind(this);
  }

  async componentDidMount() {
    const detailId = this.props.contactId;

    if (detailId) {
      await this.getContactById(detailId);
      await this.getAddresses(detailId);
    }
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.isReload !== this.state.isReload) {
      const contactId = this.props.contactId;

      if (contactId) {
        await this.getContactById(contactId);
        await this.getAddresses(contactId);
      }
    }
  }

  async getContactById(id) {
    try {
      const response = await ContactService.getById(id);

      if (response.status === 200) {
        this.setState({
          firstname: response.data.data.first_name,
          lastname: response.data.data.last_name,
          email: response.data.data.email,
          phone: response.data.data.phone,
        });
        return;
      }
    } catch (error) {
      console.log(error.response.data.errors);
      return;
    }
  }

  async getAddresses(contactId) {
    try {
      const response = await ContactAddressService.getAll(contactId);

      if (response.status === 200) {
        this.setState({
          addressList: response.data.data,
        });
        return;
      }
    } catch (error) {
      console.log(error.response.data.errors);
      return;
    }
  }

  editModeSwitcher() {
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  }

  reloadToggle() {
    this.setState({
      isReload: !this.state.isReload,
    });
  }

  render() {
    return (
      <div className={`${style.edit_contact_page}`}>
        <Header title={'Detail Contact'} backTo={'/dashboard/contacts'} />

        <main className={`${style.container}`}>
          <div className={`${style.container_header}`}>
            <h2 className={`${style.header_title}`}>
              {this.state.isEditMode ? 'Edit' : 'Detail'} |{' '}
              {this.state.firstname} {this.state.lastname}
            </h2>
            <button
              className={`${style.header_button} ${style.button_edit}`}
              type="button"
              onClick={this.editModeSwitcher}>
              <div className={`${style.button_icon_wrapper}`}>
                {this.state.isEditMode ? <FaTimes /> : <FaPencilAlt />}
              </div>
              <div className={`${style.button_text}`}>
                {this.state.isEditMode ? 'Cancel' : 'Edit'}
              </div>
            </button>
          </div>

          <EditContactForm
            isEdit={this.state.isEditMode}
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            email={this.state.email}
            phone={this.state.phone}
            reloadToggle={() => this.reloadToggle()}
            editModeSwitcher={() => this.editModeSwitcher()}
            detailId={this.props.detailId}
            contactId={this.props.contactId}
          />
        </main>

        <aside className={`${`${style.contact_address_wrapper}`}`}>
          <Link className={`${style.add_address_button}`} to="address/add">
            <FaPlus />
            <span className={`${style.button_text}`}>Add Address</span>
          </Link>

          {this.state.addressList.length > 0
            ? this.state.addressList.map((address, index) => {
                return (
                  <ContactAddressCard
                    key={index}
                    contactId={this.props.contactId || ''}
                    addressId={address.id}
                    title={`Address ${index + 1}`}
                    street={address.street}
                    city={address.city}
                    province={address.province}
                    country={address.country}
                    postalCode={address.postal_code}
                    reloadtoggle={() => this.reloadToggle()}
                  />
                );
              })
            : ''}
        </aside>
      </div>
    );
  }
}

const DetailContactPage = withHooks(detailContactHookMapper)(DetailContact);

export default DetailContactPage;
