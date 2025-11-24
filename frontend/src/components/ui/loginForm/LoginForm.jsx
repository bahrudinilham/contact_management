import * as React from 'react';
import style from './loginForm.module.css';
import {FaKey, FaSignInAlt, FaUser, FaUserPlus} from 'react-icons/fa';
import {loginHookMapper} from '../../../libs/hooksMappers';
import withHooks from '../../../libs/hoc/withHooks';
import UserService from '../../../services/UserService';
import TextField from '../textField/TextField';
import PasswordField from '../passwordField/PasswordField';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    try {
      const response = await UserService.login({
        username: this.state.username,
        password: this.state.password,
      });

      if (response.status === 200) {
        const token = response.data.data.token;
        this.props.setToken(token);

        this.setState({
          username: '',
          password: '',
        });

        alert('Login sucessfully');

        this.props.navigate('/dashboard/contacts');
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
          id={'username'}
          label={'Username'}
          Icon={FaUser}
          placeholder={'Enter your username'}
          value={this.state.username}
          onChangeFn={(e) => this.onChangeHandler('username', e.target.value)}
        />

        <PasswordField
          id={'password'}
          label={'Password'}
          Icon={FaKey}
          placeholder={'Enter your password'}
          value={this.state.password}
          onChangeFn={(e) => this.onChangeHandler('password', e.target.value)}
        />

        <button className={`${style.button_submit}`} type="submit" name="login">
          <FaSignInAlt />
          <span className={`${style.button_typography}`}>Login</span>
        </button>
      </form>
    );
  }
}

const WithLoginForm = withHooks(loginHookMapper)(LoginForm);

export default WithLoginForm;
