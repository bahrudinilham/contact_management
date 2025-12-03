import * as React from 'react';
import style from './style.module.css';

// Components
import Form from '../form/Form';
import InputField from '../inputField/InputField';
import SubmitButton from '../submitButton/SubmitButton';

// Icons
import {FaKey, FaUser, FaIdCard, FaLock} from 'react-icons/fa';

// Others
import UserService from '../../../services/UserService.js';
import withHooks from '../../../libs/hoc/withHooks.jsx';
import {alertContextHookMapper} from '../../../libs/hooksMappers/index.js';

class ProfileForm extends React.Component {
  constructor() {
    super();

    this.state = {
      newFullname: '',
      password: '',
      confirmPassword: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fullname !== this.props.fullname) {
      this.setState({newFullname: this.props.fullname});
    }
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.props.showAlert("Password does't match", 'error');
      return;
    }

    try {
      const response = await UserService.updateUser({
        name: this.state.newFullname,
        password: this.state.password,
      });

      if (response.status === 200) {
        this.setState({
          password: '',
          confirmPassword: '',
        });

        this.props.showAlert('Update user sucessfully', 'info', async () => {
          await this.props.reloadHandler();
          this.props.modeSwitcher();
        });

        return;
      }
    } catch (error) {
      this.props.showAlert(error.response.data.errors, 'error');
      return;
    }
  }

  render() {
    const {isEdit, fullname} = this.props;
    return (
      <Form
        className={`${style.profile_form}`}
        autoComplete="off"
        onSubmit={(e) => this.onSubmitHandler(e)}>
        <div>
          <InputField
            id={'fullname'}
            label={'Fullname'}
            Icon={FaIdCard}
            placeholder={'Enter your username'}
            disabled={isEdit ? false : true}
            autoComplete={'fullname'}
            value={isEdit ? this.state.newFullname : fullname || ''}
            onChange={(e) => this.setState({newFullname: e.target.value})}
          />

          {isEdit ? (
            <InputField
              id={'password'}
              label={'Password'}
              Icon={FaKey}
              placeholder={'Enter your new password'}
              type="password"
              isRequired={false}
              autoComplete={'new-password'}
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
          ) : (
            ''
          )}

          {isEdit ? (
            <InputField
              id={'confirm_password'}
              label={'Confirm Password'}
              Icon={FaLock}
              placeholder={'Confirm your new password'}
              isRequired={false}
              type="password"
              autoComplete={'new-password'}
              value={this.state.confirmPassword}
              onChange={(e) => this.setState({confirmPassword: e.target.value})}
            />
          ) : (
            ''
          )}

          {isEdit ? (
            <SubmitButton
              name={'profile_update'}
              Icon={FaUser}
              text={'Update'}
            />
          ) : (
            ''
          )}
        </div>
      </Form>
    );
  }
}

const WithProfileForm = withHooks(alertContextHookMapper)(ProfileForm);
export default WithProfileForm;
