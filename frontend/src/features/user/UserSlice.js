// src/features/user/userSlice.js
import {createSlice} from '@reduxjs/toolkit';

class UserState {
  constructor() {
    this.initialState = {
      user: null,
      loading: false,
      error: null,
    };

    this.slice = createSlice({
      name: 'user',
      initialState: this.initialState,
      reducers: {
        setUser: (state, action) => {
          state.user = action.payload;
        },
        setLoading: (state, action) => {
          state.loading = action.payload;
        },
        setError: (state, action) => {
          state.error = action.payload;
        },
        logout: (state) => {
          state.user = null;
        },
      },
    });
  }

  get reducer() {
    return this.slice.reducer;
  }

  get actions() {
    return this.slice.actions;
  }
}

// instansiasi class
const userState = new UserState();

export const userActions = userState.actions;
const userReducer = userState.reducer;
export default userReducer;
