import * as React from 'react';
import style from './registerPage.module.css';
import {FaAddressBook} from 'react-icons/fa';
import {Link} from 'react-router';
import thumbnail from '../../assets/thumbnail.webp';
import RegisterForm from '../../components/ui/registerForm/RegisterForm';

class RegisterPage extends React.Component {
  render() {
    return (
      <div className={`${style.register_page}`}>
        <section className={`${style.main_section}`}>
          <header className={`${style.page_header}`}>
            <div className={`${style.logo_wrapper}`}>
              <FaAddressBook />
            </div>
            <div className={`${style.text_wrapper}`}>
              <h1 className={`${style.headline} ${style.text}`}>
                Register Now!
              </h1>
              <p className={`${style.subheadline} ${style.text}`}>
                Fast access to manage your contacts.
              </p>
            </div>
          </header>

          <RegisterForm />

          <div className={`${style.footer_page}`}>
            Already have account?{' '}
            <Link className={`${style.link_login}`} to={'/login'}>
              Login
            </Link>
          </div>
        </section>

        <section className={`${style.thumbnail}`}>
          <img
            className={`${style.thumbnail_img}`}
            src={thumbnail}
            alt="Thumbnail"
          />
        </section>
      </div>
    );
  }
}

export default RegisterPage;
