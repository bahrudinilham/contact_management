import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const UserApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com', // ganti env jika perlu
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => {
        // params bisa berupa query string handler -> contoh simplenya:
        const qs = params ? `?${new URLSearchParams(params).toString()}` : '';
        return `/users${qs}`;
      },
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: ({id, body}) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApiSlice;
