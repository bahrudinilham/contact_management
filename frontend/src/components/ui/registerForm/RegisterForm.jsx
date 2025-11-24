import * as React from 'react';
import {FaIdCard, FaKey, FaLock, FaUser, FaUserPlus} from 'react-icons/fa';
import style from './registerForm.module.css';
import TextField from '../textField/TextField';
import PasswordField from '../passwordField/PasswordField';
import UserService from '../../../services/UserService';
import withHooks from '../../../libs/hoc/withHooks';
import {registerHookMapper} from '../../../libs/hooksMappers';

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
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      alert("Password does't match");
      return;
    }

    try {
      const response = await UserService.register({
        name: this.state.fullname,
        username: this.state.username,
        password: this.state.password,
      });

      if (response.status === 200) {
        alert('Register sucessfully');

        this.setState({
          fullname: '',
          username: '',
          password: '',
          confirmPassword: '',
        });

        this.props.navigate('/login');

        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
      return;
    }
  }

  onChangeHandler(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <form
        className={`${style.page_form}`}
        autoComplete="off"
        onSubmit={(e) => this.onSubmitHandler(e)}>
        <TextField
          id={'fullname'}
          label={'Fullname'}
          Icon={FaIdCard}
          placeholder={'Enter your name'}
          value={this.state.fullname}
          onChangeFn={(e) => this.onChangeHandler('fullname', e.target.value)}
        />

        <TextField
          id={'username'}
          label={'Username'}
          Icon={FaUser}
          placeholder={'Choose an username'}
          value={this.state.username}
          onChangeFn={(e) => this.onChangeHandler('username', e.target.value)}
        />

        <PasswordField
          id={'password'}
          label={'Password'}
          Icon={FaKey}
          placeholder={'Create a password'}
          value={this.state.password}
          onChangeFn={(e) => this.onChangeHandler('password', e.target.value)}
        />

        <PasswordField
          id={'confirm_password'}
          label={'Confirm Password'}
          Icon={FaLock}
          placeholder={'Confirm your password'}
          value={this.state.confirmPassword}
          onChangeFn={(e) =>
            this.onChangeHandler('confirmPassword', e.target.value)
          }
        />

        <button
          className={`${style.button_submit}`}
          type="submit"
          name="register">
          <FaUserPlus />
          <span className={`${style.button_typography}`}>Register</span>
        </button>
      </form>
    );
  }
}

const WithRegisterForm = withHooks(registerHookMapper)(RegisterForm);

export default WithRegisterForm;
