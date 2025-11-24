import * as React from 'react';
import {Outlet} from 'react-router';
import style from './mainLayout.module.css';

class Layout extends React.Component {
  render() {
    return (
      <div className={`${style.main_layout}`}>
        <Outlet />
      </div>
    );
  }
}

export default Layout;
