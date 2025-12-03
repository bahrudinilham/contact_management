import * as React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router';

import Layout from './components/layout/mainLayout/MainLayout';
import DashboardLayout from './components/layout/dashboardLayout/DashboardLayout';

import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import CreateContactPage from './pages/createContact/CreateContactPage';
import ContactListPage from './pages/contactList/ContactListPage';
import DetailContactPage from './pages/detailContact/DetailContact';
import AddAddressPage from './pages/addAddress/AddAddress';
import EditAddressPage from './pages/editAddress/EditAddressPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />} />

          {/* Public Route */}
          <Route element={<Layout />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Private Route */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="contacts">
              <Route index element={<ContactListPage />} />
              <Route path="add" element={<CreateContactPage />} />
              <Route path=":contactId" element={<DetailContactPage />} />
              <Route
                path=":contactId/address/add"
                element={<AddAddressPage />}
              />
              <Route
                path=":contactId/address/edit/:addressId"
                element={<EditAddressPage />}
              />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
