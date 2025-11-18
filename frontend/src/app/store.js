import {configureStore} from '@reduxjs/toolkit';
import {
  userApiMiddleware,
  userApiReducer,
} from '../features/user/UserApiService';
import userReducer from '../features/user/UserSlice';

class AppStore {
  #store;
  constructor() {
    this.#store = configureStore({
      reducer: {
        user: userReducer,
        userApi: userApiReducer,
      },
      devTools: true,
      middleware: (getDefault) => getDefault().concat(userApiMiddleware),
    });
  }

  get store() {
    return this.#store;
  }
}

const appStore = new AppStore();
const store = appStore.store;

export default store;
