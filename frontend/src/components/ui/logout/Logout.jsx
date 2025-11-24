import * as React from 'react';
import UserService from '../../../services/UserService';
import withHooks from '../../../libs/hoc/withHooks';
import {logoutHookMapper} from '../../../libs/hooksMappers';

class Logout extends React.Component {
  constructor() {
    super();

    this.state = {
      hasMounted: false,
    };
  }

  async componentDidMount() {
    if (!this.state.hasMounted) {
      await this.logoutHandler();
      this.setState({hasMounted: true});
    }
  }

  async logoutHandler() {
    try {
      const response = await UserService.logout();

      if (response.status === 200) {
        this.props.setToken('');

        alert('Logout successfully');

        this.props.navigate('/login');
        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
      return;
    }
  }

  render() {
    return <></>;
  }
}

const WithLogout = withHooks(logoutHookMapper)(Logout);

export default WithLogout;
