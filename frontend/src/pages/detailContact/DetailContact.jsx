import {Component} from 'react';
import style from './style.module.css';
import HeaderContent from '../../components/ui/headerContent/HeaderContent';
import {
  FaEnvelope,
  FaHome,
  FaIdCard,
  FaKey,
  FaLock,
  FaPencilAlt,
  FaPhone,
  FaPlus,
  FaSave,
  FaTimes,
  FaUser,
  FaUserTag,
} from 'react-icons/fa';
import TextField from '../../components/ui/textField/TextField';
import PasswordField from '../../components/ui/passwordField/PasswordField';
import SubmitButton from '../../components/ui/submitButton/SubmitButton';
import InputField from '../../components/ui/inputField/InputField';
import Form from '../../components/ui/form/Form';
import ContactService from '../../services/ContactService';
import withHooks from '../../libs/hoc/withHooks';
import {detailContactHookMapper} from '../../libs/hooksMappers';
import ContactAddressCard from '../../components/ui/contactAddressCard/ContactAddressCard';
import ContactAddressService from '../../services/ContactAddressService';
import {Link} from 'react-router';

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

      newFirstname: '',
      newLastname: '',
      newEmail: '',
      newPhone: '',

      addressList: [],

      isReload: false,
    };

    this.editModeSwitcher = this.editModeSwitcher.bind(this);
    this.getContactById = this.getContactById.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
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

  async onSubmitHandler(e) {
    e.preventDefault();

    try {
      const detailId = this.props.contactId;

      if (!detailId) {
        alert('Detail Id needed!');
        return;
      }

      const response = await ContactService.editContact(detailId, {
        firstname: this.state.newFirstname,
        lastname: this.state.newLastname,
        email: this.state.newEmail,
        phone: this.state.newPhone,
      });

      if (response.status === 200) {
        alert('Edit contact successfully');
        this.reloadToggle();
        this.editModeSwitcher();
        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
      return;
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

          newFirstname: response.data.data.first_name,
          newLastname: response.data.data.last_name,
          newEmail: response.data.data.email,
          newPhone: response.data.data.phone,
        });
        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
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
      alert(error.response.data.errors);
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
        <HeaderContent
          title={'Detail Contact'}
          backTo={'/dashboard/contacts'}
        />

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

          <Form
            className={`${style.page_form}`}
            autoComplete={'off'}
            onSubmit={(e) => this.onSubmitHandler(e)}>
            <div className={`${style.form_input_wrapper}`}>
              <InputField
                id={'first_name'}
                label={'First Name'}
                Icon={FaUser}
                placeholder={'Enter first name'}
                disabled={this.state.isEditMode ? false : true}
                value={
                  this.state.isEditMode
                    ? this.state.newFirstname
                    : this.state.firstname || ''
                }
                onChange={(e) => this.setState({newFirstname: e.target.value})}
              />
              <InputField
                id={'last_name'}
                label={'Last Name'}
                Icon={FaUserTag}
                placeholder={'Enter last name'}
                disabled={this.state.isEditMode ? false : true}
                value={
                  this.state.isEditMode
                    ? this.state.newLastname
                    : this.state.lastname || ''
                }
                onChange={(e) => this.setState({newLastname: e.target.value})}
              />
            </div>
            <InputField
              id={'email'}
              label={'Email'}
              Icon={FaEnvelope}
              placeholder={'Enter email address'}
              disabled={this.state.isEditMode ? false : true}
              type={'email'}
              value={
                this.state.isEditMode
                  ? this.state.newEmail
                  : this.state.email || ''
              }
              onChange={(e) => this.setState({newEmail: e.target.value})}
            />
            <InputField
              id={'phone'}
              label={'Phone'}
              Icon={FaPhone}
              placeholder={'Enter phone number'}
              type={'tel'}
              disabled={this.state.isEditMode ? false : true}
              value={
                this.state.isEditMode
                  ? this.state.newPhone
                  : this.state.phone || ''
              }
              onChange={(e) => this.setState({newPhone: e.target.value})}
            />

            {this.state.isEditMode ? (
              <SubmitButton
                name={'update_contact'}
                Icon={FaSave}
                text={'Update'}
              />
            ) : (
              ''
            )}
          </Form>
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
