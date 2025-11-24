import * as React from 'react';
import style from './dashboardLayout.module.css';
import Navbar from '../../ui/navbar/Navbar';
import {Outlet} from 'react-router';

class DashboardLayout extends React.Component {
  render() {
    return (
      <div className={`${style.dashboard_layout}`}>
        <Navbar />

        <main className={`${style.content_wrapper}`}>
          <div className={`${style.content}`}>
            <Outlet />
          </div>
        </main>
      </div>
    );
  }
}

export default DashboardLayout;
