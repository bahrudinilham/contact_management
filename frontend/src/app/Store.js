import {configureStore} from '@reduxjs/toolkit';
import {UserApiSlice} from '../features/user/UserApiSlice';

const store = configureStore({
  reducer: {
    [UserApiSlice.reducerPath]: UserApiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(UserApiSlice.middleware),
  devTools: true,
});

export default store;
