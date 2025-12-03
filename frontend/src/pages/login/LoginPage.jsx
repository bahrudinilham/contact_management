import * as React from 'react';
import style from './loginPage.module.css';

// Components
import LoginForm from '../../components/ui/loginForm/LoginForm';
import {Link} from 'react-router';

// Icons
import {FaAddressBook} from 'react-icons/fa';

// Others
import thumbnail from '../../assets/thumbnail.webp';

class LoginPage extends React.Component {
  render() {
    return (
      <div className={`${style.login_page}`}>
        <section className={`${style.main_section}`}>
          <header className={`${style.page_header}`}>
            <div className={`${style.logo_wrapper}`}>
              <FaAddressBook />
            </div>
            <div className={`${style.text_wrapper}`}>
              <h1 className={`${style.headline} ${style.text}`}>
                Wellcome User!
              </h1>
              <p className={`${style.subheadline} ${style.text}`}>
                Sign in to manage your contacts.
              </p>
            </div>
          </header>

          <LoginForm />

          <div className={`${style.footer_page}`}>
            Dont have an account yet?{' '}
            <Link className={`${style.link_login}`} to={'/register'}>
              Register
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

export default LoginPage;
