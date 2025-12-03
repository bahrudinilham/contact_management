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
import {
  navigateHookMapper,
  alertContextHookMapper,
} from '../../../libs/hooksMappers';

class CreateContactForm extends Component {
  constructor() {
    super();

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    try {
      const response = await ContactService.createContact({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        phone: this.state.phone,
      });

      if (response.status === 200) {
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
        });

        this.props.showAlert('Add contact sucessfully', 'info', () =>
          this.props.navigate('/dashboard/contacts')
        );

        return;
      }
    } catch (error) {
      this.props.showAlert(error.response.data.errors, 'error');
      return;
    }
  }

  render() {
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
            value={this.state.firstname}
            onChange={(e) => this.setState({firstname: e.target.value})}
          />
          <InputField
            id={'last_name'}
            label={'Last Name'}
            Icon={FaUserTag}
            placeholder={'Enter last name'}
            value={this.state.lastname}
            onChange={(e) => this.setState({lastname: e.target.value})}
          />
        </div>
        <InputField
          id={'email'}
          label={'Email'}
          Icon={FaEnvelope}
          placeholder={'Enter email address'}
          type={'email'}
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})}
        />
        <InputField
          id={'phone'}
          label={'Phone'}
          Icon={FaPhone}
          placeholder={'Enter phone number'}
          type={'tel'}
          value={this.state.phone}
          onChange={(e) => this.setState({phone: e.target.value})}
        />

        <SubmitButton name={'save_contact'} Icon={FaSave} text={'Save'} />
      </Form>
    );
  }
}

const CreateContactFormWithAlert = withHooks(alertContextHookMapper)(
  CreateContactForm
);
const CreateContactFormWithNavigate = withHooks(navigateHookMapper)(
  CreateContactFormWithAlert
);
const CreateContactFormWithHoc = CreateContactFormWithNavigate;

export default CreateContactFormWithHoc;
