import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {AuthResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../types.ts";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000', credentials: 'include' }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse,RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      })
    }),
    login: builder.mutation<LoginResponse,LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation<{message: string},void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      })
    }),
    getCurrentUser: builder.query<AuthResponse,void>({
      query: () => 'auth/me',
    }),
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = api