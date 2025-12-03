/* eslint-disable react-hooks/rules-of-hooks */
import {useContext} from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import {useLocalStorage} from 'react-use';
import {AlertContext} from '../context/AlertContext';

export const navigateHookMapper = () => {
  const navigate = useNavigate();

  return {
    navigate,
  };
};

export const alertContextHookMapper = () => {
  const {showAlert, hideAlert} = useContext(AlertContext);

  return {
    showAlert,
    hideAlert,
  };
};

export const registerHookMapper = () => {
  const navigate = useNavigate();

  return {
    navigate,
  };
};

export const loginHookMapper = () => {
  const navigate = useNavigate();
  const [_, setToken] = useLocalStorage('token', '');

  return {
    navigate,
    setToken,
  };
};

export const logoutHookMapper = () => {
  const navigate = useNavigate();
  const removeToken = () => window.localStorage.removeItem('token');

  return {
    removeToken,
    navigate,
  };
};

export const contactListHookMapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return {
    location,
    navigate,
    searchParams,
  };
};

export const detailContactHookMapper = () => {
  const navigate = useNavigate();
  const {contactId} = useParams();

  return {
    navigate,
    contactId,
  };
};

export const addContactAddressHookMapper = () => {
  const navigate = useNavigate();
  const {contactId} = useParams();

  return {
    navigate,
    contactId,
  };
};

export const editContactAddressHookMapper = () => {
  const navigate = useNavigate();
  const {contactId, addressId} = useParams();

  return {
    navigate,
    contactId,
    addressId,
  };
};
