// src/features/user/userApi.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

class UserApiService {
  constructor() {
    this.api = createApi({
      reducerPath: 'userApi',
      baseQuery: fetchBaseQuery({baseUrl: '/api'}),

      endpoints: (builder) => ({
        register: builder.mutation({
          query: (data) => ({
            url: '/register',
            method: 'POST',
            body: data,
          }),
        }),
      }),
    });
  }

  get reducer() {
    return this.api.reducer;
  }

  get middleware() {
    return this.api.middleware;
  }

  get hooks() {
    return this.api;
  }
}

const userApiService = new UserApiService();

// export hook RTK Query
export const {useRegisterMutation} = userApiService.hooks;

export const userApiReducer = userApiService.reducer;
export const userApiMiddleware = userApiService.middleware;
