import React from "react";
import BaseComponent from "../BaseComponent.jsx";
import { userApi } from "../../lib/api/UserApi.js";
import { alertService } from "../../lib/alert.js";
import { withRouter } from "../../lib/withRouter.jsx";
import { Link } from "react-router";

class UserProfilePage extends BaseComponent {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token") || "";
    this.state = {
      token,
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.fetchProfile = this.fetchProfile.bind(this);
  }

  componentDidMount() {
    this.fetchProfile();
  }

  async fetchProfile() {
    const { token } = this.state;
    const response = await userApi.detail(token);
    if (response.isSuccess()) {
      this.setStatePartial({
        name: response.data.name,
        username: response.data.username,
      });
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  async handleSubmitProfile(event) {
    event.preventDefault();
    const { token, name } = this.state;
    const response = await userApi.updateProfile(token, { name });
    if (response.isSuccess()) {
      await alertService.success("Profile updated successfully");
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  async handleSubmitPassword(event) {
    event.preventDefault();
    const { token, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      await alertService.error("Passwords do not match");
      return;
    }
    const response = await userApi.updatePassword(token, { password });
    if (response.isSuccess()) {
      await alertService.success("Password updated successfully");
      this.setStatePartial({ password: "", confirmPassword: "" });
    } else {
      await alertService.error(response.errorMessage);
    }
  }

  render() {
    const { name, username, password, confirmPassword } = this.state;

    return (
      <>
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard/contacts"
            className="text-purple-600 hover:text-purple-700 mr-4 flex items-center transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Contacts
          </Link>
        </div>

        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center mr-3 shadow-md">
            <i className="fas fa-user-cog text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card gradient-border rounded-xl shadow-xl overflow-hidden card-hover animate-fade-in">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient rounded-full flex items-center justify-center mr-3 shadow-md">
                  <i className="fas fa-user-edit text-white"></i>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Profile
                </h2>
              </div>
              <form onSubmit={this.handleSubmitProfile}>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                      value={name}
                      onChange={(e) =>
                        this.setStatePartial({ name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      disabled
                      id="username"
                      name="username"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white input-glow transition-all duration-200"
                      value={username}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <i className="fas fa-save mr-2"></i> Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="glass-card gradient-border rounded-xl shadow-xl overflow-hidden card-hover animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center mr-3 shadow-md glow-purple">
                  <i className="fas fa-key text-white"></i>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Change Password
                </h2>
              </div>
              <form onSubmit={this.handleSubmitPassword}>
                <div className="mb-5">
                  <label
                    htmlFor="new_password"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      id="new_password"
                      name="new_password"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Enter your new password"
                      required
                      value={password}
                      onChange={(e) =>
                        this.setStatePartial({ password: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="confirm_password"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-check-double text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white input-glow transition-all duration-200"
                      placeholder="Confirm your new password"
                      required
                      value={confirmPassword}
                      onChange={(e) =>
                        this.setStatePartial({
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-accent text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <i className="fas fa-key mr-2"></i> Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const UserProfilePageWithRouter = withRouter(UserProfilePage);

export default UserProfilePageWithRouter;
