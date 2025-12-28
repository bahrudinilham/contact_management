import React from "react";
import { Link, Outlet } from "react-router-dom";
import BaseComponent from "./BaseComponent.jsx";
import { withRouter } from "../lib/withRouter.jsx";

class DashboardLayoutClass extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 min-h-screen flex flex-col">
          <header className="glass shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link
                to="/dashboard/contacts"
                className="flex items-center hover:opacity-90 transition-opacity duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:glow-sm transition-all duration-300">
                  <i className="fas fa-address-book text-white text-lg"></i>
                </div>
                <div className="text-gray-800 font-bold text-xl">
                  Contact Management
                </div>
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      to="/dashboard/users/profile"
                      className="text-gray-600 hover:text-gray-900 flex items-center transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <i className="fas fa-user-circle mr-2"></i>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/users/logout"
                      className="text-gray-600 hover:text-gray-900 flex items-center transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="h-0.5 bg-gradient"></div>
          </header>

          <main className="container mx-auto px-4 py-8 flex-grow">
            <Outlet />
          </main>
        </div>
      </>
    );
  }
}

export default withRouter(DashboardLayoutClass);
