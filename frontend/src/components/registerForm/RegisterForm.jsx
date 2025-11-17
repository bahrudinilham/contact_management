import {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './registerForm.module.css';
import {FaIdCard, FaKey, FaLock, FaUser, FaUserPlus} from 'react-icons/fa';
import InputField from '../shared/inputField/InputField';

class RegisterForm extends Component {
  render() {
    return (
      <form className={`${style.register_form}`}>
        <fieldset className={`${style.wrapper}`}>
          <legend className={`${style.header}`}>
            <div className={`${style.icon_wrapper}`}>
              <FaUserPlus />
            </div>
            <h1 className={`${style.heading}`}>Contact Management</h1>
            <span className={`${style.subheading}`}>Create an new account</span>
          </legend>

          <InputField
            id={'fullname'}
            iconLabel={<FaIdCard />}
            textLabel={'Fullname'}
            type={'text'}
            placeholder={'Enter your fullname'}
          />

          <InputField
            id={'username'}
            iconLabel={<FaUser />}
            textLabel={'Username'}
            type={'text'}
            placeholder={'Choose a username'}
          />

          <InputField
            id={'password'}
            iconLabel={<FaKey />}
            textLabel={'Password'}
            type={'password'}
            placeholder={'Create a password'}
          />

          <InputField
            id={'confirm_password'}
            iconLabel={<FaLock />}
            textLabel={'Confirm Password'}
            type={'password'}
            placeholder={'Confirm your password'}
          />

          <div className={`${style.footer}`}>
            <button type="submit" className={`${style.submit_button}`}>
              Register
            </button>
            <p className={`${style.link_wrapper}`}>
              <span className={`${style.cta_text}`}>
                Already have an account?
              </span>{' '}
              <Link className={`${style.login_link}`} to="/login">
                Login
              </Link>
            </p>
          </div>
        </fieldset>
        <div className={`${style.thumbnail}`}>
          <FaUserPlus />
        </div>
      </form>
    );
  }
}

export default RegisterForm;
