import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'http://89.111.169.135:8080';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth`,
  }),
  tagTypes: ['Auth'],
  
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ username, email, password }) => ({
        url: '/reg',
        method: 'POST',
        body: { username, email, password }
      }),
      transformResponse: (response, meta, arg) => {
        // Добавляем username из аргументов запроса
        return {
          ...response,
          username: arg.username
        };
      }
    }),
    
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/login',
        method: 'POST',
        body: { username, password }
      })
    }),
    
    refreshToken: builder.mutation({
      query: ({ refreshToken }) => ({
        url: '/refresh',
        method: 'POST',
        body: { refreshToken }
      })
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation
} = authApi;

export default authApi;