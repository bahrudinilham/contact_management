/* eslint-disable react-hooks/rules-of-hooks */
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import {useLocalStorage} from 'react-use';

export const navigateHookMapper = () => {
  const navigate = useNavigate();

  return {
    navigate,
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
  const [token, setToken] = useLocalStorage('token', '');

  return {
    token,
    setToken,
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
