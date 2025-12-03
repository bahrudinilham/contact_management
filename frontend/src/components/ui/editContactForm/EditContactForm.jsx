import {Component} from 'react';
import style from './style.module.css';

// Components
import Form from '../form/Form';
import InputField from '../inputField/InputField';
import SubmitButton from '../submitButton/SubmitButton';

// Icons
import {FaEnvelope, FaPhone, FaSave, FaUser, FaUserTag} from 'react-icons/fa';

// Others
import ContactService from '../../../services/ContactService';
import withHooks from '../../../libs/hoc/withHooks';
import {alertContextHookMapper} from '../../../libs/hooksMappers';

class EditContactForm extends Component {
  constructor() {
    super();

    this.state = {
      newFirstname: '',
      newLastname: '',
      newEmail: '',
      newPhone: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.firstname !== this.props.firstname) {
      this.setState({
        newFirstname: this.props.firstname,
      });
    }
    if (prevProps.lastname !== this.props.lastname) {
      this.setState({
        newLastname: this.props.lastname,
      });
    }
    if (prevProps.email !== this.props.email) {
      this.setState({
        newEmail: this.props.email,
      });
    }
    if (prevProps.phone !== this.props.phone) {
      this.setState({
        newPhone: this.props.phone,
      });
    }
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    try {
      const detailId = this.props.contactId;

      if (!detailId) {
        this.props.showAlert('Detail Id needed!', 'error');
        return;
      }

      const response = await ContactService.editContact(detailId, {
        firstname: this.state.newFirstname,
        lastname: this.state.newLastname,
        email: this.state.newEmail,
        phone: this.state.newPhone,
      });

      if (response.status === 200) {
        this.props.showAlert('Edit contact successfully', 'info', () => {
          this.props.reloadToggle();
          this.props.editModeSwitcher();
        });
        return;
      }
    } catch (error) {
      this.props.showAlert(error.response.data.errors);
      return;
    }
  }

  render() {
    const {isEdit, firstname, lastname, email, phone} = this.props;

    return (
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
            disabled={isEdit ? false : true}
            value={isEdit ? this.state.newFirstname : firstname || ''}
            onChange={(e) => this.setState({newFirstname: e.target.value})}
          />
          <InputField
            id={'last_name'}
            label={'Last Name'}
            Icon={FaUserTag}
            placeholder={'Enter last name'}
            disabled={isEdit ? false : true}
            value={isEdit ? this.state.newLastname : lastname || ''}
            onChange={(e) => this.setState({newLastname: e.target.value})}
          />
        </div>
        <InputField
          id={'email'}
          label={'Email'}
          Icon={FaEnvelope}
          placeholder={'Enter email address'}
          disabled={isEdit ? false : true}
          type={'email'}
          value={isEdit ? this.state.newEmail : email || ''}
          onChange={(e) => this.setState({newEmail: e.target.value})}
        />
        <InputField
          id={'phone'}
          label={'Phone'}
          Icon={FaPhone}
          placeholder={'Enter phone number'}
          type={'tel'}
          disabled={isEdit ? false : true}
          value={isEdit ? this.state.newPhone : phone || ''}
          onChange={(e) => this.setState({newPhone: e.target.value})}
        />

        {isEdit ? (
          <SubmitButton name={'update_contact'} Icon={FaSave} text={'Update'} />
        ) : (
          ''
        )}
      </Form>
    );
  }
}

const WithAlert = withHooks(alertContextHookMapper)(EditContactForm);
const EditContactFormWithHoc = WithAlert;

export default EditContactFormWithHoc;
