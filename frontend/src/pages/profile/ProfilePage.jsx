import * as React from 'react';
import style from './profilePage.module.css';
import {Link} from 'react-router';
import {
  FaArrowLeft,
  FaKey,
  FaUser,
  FaPencilAlt,
  FaTimes,
  FaIdCard,
  FaLock,
} from 'react-icons/fa';
import TextField from '../../components/ui/textField/TextField';
import PasswordField from '../../components/ui/passwordField/PasswordField';
import SubmitButton from '../../components/ui/submitButton/SubmitButton';
import UserService from '../../services/UserService';

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      username: '',
      newFullname: '',

      password: '',
      confirmPassword: '',

      isEditMode: false,
    };

    this.editModeSwitcher = this.editModeSwitcher.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  async componentDidMount() {
    await this.getCurrentUser();
    this.setState({newFullname: this.state.fullname});
  }

  async getCurrentUser() {
    try {
      const response = await UserService.userDetail();

      if (response.status === 200) {
        this.setState({
          username: response.data.data.username,
          fullname: response.data.data.name || '',
        });
        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
      return;
    }
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      alert("Password does't match");
      return;
    }

    try {
      const response = await UserService.updateUser({
        name: this.state.newFullname,
        password: this.state.password,
      });

      if (response.status === 200) {
        this.setState({
          username: '',
          password: '',
          confirmPassword: '',
        });

        alert('Update user sucessfully');

        await this.getCurrentUser();
        this.editModeSwitcher();
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

  onChangeHandler(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <div className={`${style.profile_page}`}>
        <header className={`${style.header}`}>
          <Link className={`${style.back_link}`} to="/dashboard/contacts">
            <FaArrowLeft />
            <span className={`${style.link_typography}`}>Back</span>
          </Link>
          <h1 className={`${style.title_page}`}>Profile</h1>
        </header>

        <main className={`${style.container}`}>
          <div className={`${style.container_header}`}>
            <h2 className={`${style.header_title}`}>
              {this.state.isEditMode ? 'Edit' : 'Your'} Profile | @
              {this.state.username}
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
          <form
            className={`${style.form}`}
            autoComplete="off"
            onSubmit={(e) => this.onSubmitHandler(e)}>
            <div>
              <TextField
                id={'fullname'}
                label={'Fullname'}
                Icon={FaIdCard}
                placeholder={'Enter your username'}
                isDisabled={this.state.isEditMode ? false : true}
                value={
                  this.state.isEditMode
                    ? this.state.newFullname
                    : this.state.fullname || ''
                }
                onChangeFn={(e) =>
                  this.onChangeHandler('newFullname', e.target.value)
                }
              />

              {this.state.isEditMode ? (
                <PasswordField
                  id={'password'}
                  label={'Password'}
                  Icon={FaKey}
                  placeholder={'Enter your new password'}
                  isRequired={false}
                  value={this.state.password}
                  onChangeFn={(e) =>
                    this.onChangeHandler('password', e.target.value)
                  }
                />
              ) : (
                ''
              )}

              {this.state.isEditMode ? (
                <PasswordField
                  id={'confirm_password'}
                  label={'Confirm Password'}
                  Icon={FaLock}
                  placeholder={'Confirm your new password'}
                  isRequired={false}
                  value={this.state.confirmPassword}
                  onChangeFn={(e) =>
                    this.onChangeHandler('confirmPassword', e.target.value)
                  }
                />
              ) : (
                ''
              )}

              {this.state.isEditMode ? (
                <SubmitButton
                  name={'profile_update'}
                  Icon={FaUser}
                  text={'Update'}
                />
              ) : (
                ''
              )}
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default ProfilePage;
