import * as React from 'react';
import {Navigate, Outlet} from 'react-router';
import style from './mainLayout.module.css';

class Layout extends React.Component {
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

    if (this.state.isAuth) {
      return <Navigate to="/dashboard/contacts" />;
    }

    return (
      <div className={`${style.main_layout}`}>
        <Outlet />
      </div>
    );
  }
}

export default Layout;
