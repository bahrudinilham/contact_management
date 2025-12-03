import * as React from 'react';
import style from './registerForm.module.css';

// Components
import Form from '../form/Form';
import InputField from '../inputField/InputField';
import SubmitButton from '../submitButton/SubmitButton';

// Icons
import {FaIdCard, FaKey, FaLock, FaUser, FaUserPlus} from 'react-icons/fa';

// Others
import UserService from '../../../services/UserService';
import withHooks from '../../../libs/hoc/withHooks';
import {
  alertContextHookMapper,
  registerHookMapper,
} from '../../../libs/hooksMappers';

class RegisterForm extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.props.showAlert("Password does't match", 'error');
      return;
    }

    try {
      const response = await UserService.register({
        name: this.state.fullname,
        username: this.state.username,
        password: this.state.password,
      });

      if (response.status === 200) {
        this.setState({
          fullname: '',
          username: '',
          password: '',
          confirmPassword: '',
        });

        this.props.showAlert('Register successfully', 'info', () =>
          this.props.navigate('/login')
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
        autoComplete="off"
        onSubmit={(e) => this.onSubmitHandler(e)}>
        <InputField
          id={'fullname'}
          label={'Fullname'}
          Icon={FaIdCard}
          placeholder={'Enter your name'}
          value={this.state.fullname}
          onChange={(e) => this.setState({fullname: e.target.value})}
        />

        <InputField
          id={'username'}
          label={'Username'}
          Icon={FaUser}
          placeholder={'Choose an username'}
          value={this.state.username}
          onChange={(e) => this.setState({username: e.target.value})}
        />

        <InputField
          id={'password'}
          label={'Password'}
          Icon={FaKey}
          placeholder={'Create a password'}
          type={'password'}
          value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})}
        />

        <InputField
          id={'confirm_password'}
          label={'Confirm Password'}
          Icon={FaLock}
          placeholder={'Confirm your password'}
          type={'password'}
          value={this.state.confirmPassword}
          onChange={(e) => this.setState({confirmPassword: e.target.value})}
        />

        <SubmitButton name={'register'} Icon={FaUserPlus} text="Register" />
      </Form>
    );
  }
}

const WithAlert = withHooks(alertContextHookMapper)(RegisterForm);
const WithRegisterForm = withHooks(registerHookMapper)(WithAlert);

export default WithRegisterForm;
