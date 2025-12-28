import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import UserRegisterPage from "./components/User/UserRegisterPage.jsx";
import UserLoginPage from "./components/User/UserLoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import UserProfilePage from "./components/User/UserProfilePage.jsx";
import UserLogoutPage from "./components/User/UserLogoutPage.jsx";
import ContactCreatePage from "./components/Contact/ContactCreatePage.jsx";
import ContactListPage from "./components/Contact/ContactListPage.jsx";
import ContactEditPage from "./components/Contact/ContactEditPage.jsx";
import ContactDetailPage from "./components/Contact/ContactDetailPage.jsx";
import AddressCreatePage from "./components/Address/AddressCreatePage.jsx";
import AddressEditPage from "./components/Address/AddressEditPage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<Layout />}>
            <Route path="/register" element={<UserRegisterPage />} />
            <Route path="/login" element={<UserLoginPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>

            <Route path="users">
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="logout" element={<UserLogoutPage />} />
            </Route>

            <Route path="contacts">
              <Route index element={<ContactListPage />} />
              <Route path="create" element={<ContactCreatePage />} />
              <Route path=":id">
                <Route index element={<ContactDetailPage />} />
                <Route path="edit" element={<ContactEditPage />} />
                <Route path="addresses">
                  <Route path="create" element={<AddressCreatePage />} />
                  <Route path=":addressId/edit" element={<AddressEditPage />} />
                </Route>
              </Route>
            </Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
