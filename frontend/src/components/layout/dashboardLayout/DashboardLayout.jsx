import * as React from 'react';
import style from './dashboardLayout.module.css';
import Navbar from '../../ui/navbar/Navbar';
import {Navigate, Outlet} from 'react-router';

class DashboardLayout extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isAuth: false,
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');

    if (token) {
      this.setState({isAuth: true});
    } else {
      this.setState({isAuth: false});
    }

    this.setState({isLoading: false});
  }

  render() {
    if (this.state.isLoading) {
      return <h1> Loading Bruh ..... </h1>;
    }

    if (!this.state.isAuth) {
      return <Navigate to="/login" />;
    }

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
