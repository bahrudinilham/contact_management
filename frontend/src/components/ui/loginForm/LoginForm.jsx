import * as React from 'react';
import style from './loginForm.module.css';

// Components
import Form from '../form/Form';
import InputField from '../inputField/InputField';
import SubmitButton from '../submitButton/SubmitButton';

// Icons
import {FaKey, FaSignInAlt, FaUser} from 'react-icons/fa';

// Others
import withHooks from '../../../libs/hoc/withHooks';
import {
  alertContextHookMapper,
  loginHookMapper,
} from '../../../libs/hooksMappers';
import UserService from '../../../services/UserService';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
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

        this.props.showAlert('Login successfully', 'info', () =>
          this.props.navigate('/dashboard/contacts')
        );

        this.setState({
          username: '',
          password: '',
        });

        return;
      }
    } catch (error) {
      this.props.showAlert(error.response.data.errors, 'error');

      this.setState({
        username: '',
        password: '',
      });

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
          id={'username'}
          label={'Username'}
          Icon={FaUser}
          placeholder={'Enter your username'}
          value={this.state.username}
          onChange={(e) => this.setState({username: e.target.value})}
        />

        <InputField
          id={'password'}
          label={'Password'}
          type={'password'}
          Icon={FaKey}
          placeholder={'Enter your password'}
          value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})}
        />

        <SubmitButton name="login" Icon={FaSignInAlt} text="Login" />
      </Form>
    );
  }
}

const WithAlert = withHooks(alertContextHookMapper)(LoginForm);
const WithLoginForm = withHooks(loginHookMapper)(WithAlert);

export default WithLoginForm;
