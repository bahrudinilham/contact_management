import React from 'react';
import BaseComponent from '../BaseComponent.jsx';
import {userApi} from '../../lib/api/UserApi.js';
import {alertService} from '../../lib/alert.js';
import {withRouter} from '../../lib/withRouter.jsx';

class UserLogoutPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.handleLogout().then(() => console.log('User logged out successfully'));
  }

  async handleLogout() {
    const tokenStr = localStorage.getItem('token') || '';
    let token = tokenStr;
    try {
      const parsed = JSON.parse(tokenStr);
      if (typeof parsed === 'string') token = parsed;
    } catch (e) {
      console.log(e);
    }

    const response = await userApi.logout(token);
    console.log(response);

    if (response.isSuccess()) {
      localStorage.removeItem('token');
      this.props.navigate({
        pathname: '/login',
      });
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  render() {
    return <></>;
  }
}

const UserLogoutPageWithRouter = withRouter(UserLogoutPage)

export default UserLogoutPageWithRouter
