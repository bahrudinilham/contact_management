import * as React from 'react';
import HeaderContent from '../../components/ui/headerContent/HeaderContent';
import Form from '../../components/ui/form/Form';
import InputField from '../../components/ui/inputField/InputField';
import SubmitButton from '../../components/ui/submitButton/SubmitButton';
import {FaUser, FaUserTag, FaEnvelope, FaPhone, FaSave} from 'react-icons/fa';
import style from './style.module.css';
import ContactService from '../../services/ContactService';
import withHooks from '../../libs/hoc/withHooks';
import {navigateHookMapper} from '../../libs/hooksMappers';

class CreateContact extends React.Component {
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

        alert('Add contact sucessfully');

        this.props.navigate('/dashboard/contacts');
        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
      return;
    }
  }

  render() {
    return (
      <div className={`${style.create_contact_page}`}>
        <HeaderContent
          title={'Create Contact'}
          backTo={'/dashboard/contacts'}
        />

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
      </div>
    );
  }
}

const CreateContactPage = withHooks(navigateHookMapper)(CreateContact);

export default CreateContactPage;
