import * as React from 'react';
import style from './navbar.module.css';
import {NavLink} from 'react-router';
import {FaHome, FaUser, FaSignOutAlt, FaAddressBook} from 'react-icons/fa';

class Navbar extends React.Component {
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

export default Navbar;
