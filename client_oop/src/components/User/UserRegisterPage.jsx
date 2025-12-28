import React from 'react';
import BaseComponent from '../BaseComponent.jsx';
import {Link} from 'react-router-dom';
import {userApi} from '../../lib/api/UserApi.js';
import {alertService} from '../../lib/alert.js';
import {withRouter} from '../../lib/withRouter.jsx';

class UserRegisterPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {username, password, confirmPassword, name} = this.state;
    if (password !== confirmPassword) {
      await alertService.error('Passwords do not match');
      return;
    }
    const response = await userApi.register({username, password, name});
    if (response.isSuccess()) {
      await alertService.success('Registration successful. Please login.');
      this.props.navigate('/login');
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.navigate('/dashboard/contacts');
    }
  }

  render() {
    const {username, password, confirmPassword, name} = this.state;

    return (
      <>
        <div className="animate-fade-in glass-card gradient-border p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-accent rounded-2xl mb-4 shadow-lg glow-purple">
              <i className="fas fa-user-plus text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-2">Join us today</p>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-gray-600 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-id-card text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white input-glow transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                  value={name}
                  onChange={(e) => this.setStatePartial({name: e.target.value})}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-gray-600 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white input-glow transition-all duration-200"
                  placeholder="Choose a username"
                  required
                  value={username}
                  onChange={(e) =>
                    this.setStatePartial({username: e.target.value})
                  }
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={(e) =>
                    this.setStatePartial({password: e.target.value})
                  }
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-check-double text-gray-400"></i>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) =>
                    this.setStatePartial({confirmPassword: e.target.value})
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <i className="fas fa-user-plus mr-2"></i>
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}

const UserRegisterPageWithRouter = withRouter(UserRegisterPage);

export default UserRegisterPageWithRouter;
