import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {
  AuthResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse, StatsResponse, TransactionRequest,
  TransactionsResponse
} from "../types.ts";
import type {TransactionType} from "@pages/DashboardPage.tsx";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000', credentials: 'include' }),
  tagTypes: ['Transactions','Stats'],
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
      query: () => '/auth/me',
    }),
    getTransactions: builder.query<TransactionsResponse,{type?: TransactionType}>({
      query: ({ type }) => `/transactions${type && type !== 'all' ? `?type=${type}` : ''}`,
      providesTags: ['Transactions'],
    }),
    createTransaction: builder.mutation<TransactionsResponse,TransactionRequest>({
      query: (transaction) => ({
        url: '/transactions',
        method: 'POST',
        body: transaction
      }),
      invalidatesTags: ['Transactions','Stats'],
    }),
    updateTransaction: builder.mutation<TransactionsResponse,TransactionRequest>({
      query: ({id, ...transaction}) => ({
        url: `/transactions/:${id}`,
        method: 'PUT',
        body: transaction
      })
    }),
    deleteTransaction: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transactions','Stats'],
    }),
    getStats: builder.query<StatsResponse,void>({
      query: () => '/stats',
      providesTags: ['Stats'],
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetStatsQuery,
} = api