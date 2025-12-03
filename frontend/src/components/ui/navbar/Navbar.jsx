import * as React from 'react';
import style from './navbar.module.css';

// Components
import {NavLink} from 'react-router';

// Icons
import {FaHome, FaUser, FaSignOutAlt, FaAddressBook} from 'react-icons/fa';
import UserService from '../../../services/UserService';

import withHooks from '../../../libs/hoc/withHooks';
import {
  logoutHookMapper,
  alertContextHookMapper,
} from '../../../libs/hooksMappers';

class Navbar extends React.Component {
  constructor() {
    super();

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  async logoutHandler() {
    try {
      const response = await UserService.logout();

      if (response.status === 200) {
        this.props.removeToken();

        setTimeout(() => {
          this.props.navigate('/login');
        }, 500);

        return;
      }
    } catch (error) {
      this.props.showAlert(error.response.data.errors, 'error');
      return;
    }
  }

  LINKS = [
    {icon: <FaHome />, text: 'Home', path: '/dashboard/contacts'},
    {icon: <FaUser />, text: 'Profile', path: '/dashboard/profile'},
    {icon: <FaSignOutAlt />, text: 'Logout', path: '/dashboard/logout'},
  ];

  render() {
    return (
      <nav className={`${style.navbar}`}>
        <header className={`${style.header}`}>
          <div className={`${style.logo_wrapper}`}>
            <FaAddressBook />
          </div>
          <h1 className={`${style.logo_typography}`}>
            Contact
            <br />
            Manager
          </h1>
        </header>
        <main className={`${style.link_wrapper}`}>
          {this.LINKS.map((link) => {
            if (link.text === 'Logout') {
              return (
                <button
                  className={`${style.link}`}
                  key={link.path}
                  onClick={() => {
                    this.props.showAlert('Are u sure to Logout?', 'confirm', {
                      ok: async () => {
                        await this.logoutHandler();
                      },
                      cancel: () => {
                        this.props.navigate('/dashboard/contacts');
                      },
                    });
                  }}>
                  <div className={`${style.link_icon}`}>{link.icon}</div>
                  <div className={`${style.link_text}`}>{link.text}</div>
                </button>
              );
            }

            return (
              <NavLink
                className={`${style.link}`}
                key={link.path}
                to={link.path}>
                <div className={`${style.link_icon}`}>{link.icon}</div>
                <div className={`${style.link_text}`}>{link.text}</div>
              </NavLink>
            );
          })}
        </main>
      </nav>
    );
  }
}

const WithAlert = withHooks(alertContextHookMapper)(Navbar);
const NavbarWithHoc = withHooks(logoutHookMapper)(WithAlert);

export default NavbarWithHoc;
