import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import type {
  AuthResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  StatsResponse,
  TransactionRequest,
  TransactionsResponse,
  TransactionType,
} from "types.ts";

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const token = localStorage.getItem('token');

  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers) => {
      headers.set('bypass-tunnel-reminder', 'true');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Transactions", "Stats"],
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.token);
        } catch (error) {
          console.error('Register failed:', error);
        }
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.token);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted() {
        localStorage.removeItem('token');
      },
    }),
    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => "/auth/me",
    }),
    getTransactions: builder.query<
      TransactionsResponse,
      {
        type?: TransactionType;
        dateFrom?: string | null;
        dateTo?: string | null;
        limit?: number;
        page?: number;
      }
    >({
      query: ({ type, dateFrom, dateTo, limit, page }) => {
        const params = new URLSearchParams();

        if (type && type !== "all") {
          params.append("type", type);
        }
        if (dateFrom) {
          params.append("dateFrom", dateFrom);
        }
        if (dateTo) {
          params.append("dateTo", dateTo);
        }
        if (limit) {
          params.append("limit", String(limit));
        }
        if (page) {
          params.append("page", String(page));
        }

        return `/transactions${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["Transactions"],
    }),
    createTransaction: builder.mutation<
      TransactionsResponse,
      TransactionRequest
    >({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transactions", "Stats"],
    }),
    updateTransaction: builder.mutation<
      TransactionsResponse,
      { id: number; transaction: TransactionRequest }
    >({
      query: ({ id, transaction }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: ["Transactions", "Stats"],
    }),
    deleteTransaction: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions", "Stats"],
    }),
    getStats: builder.query<StatsResponse, void>({
      query: () => "/stats",
      providesTags: ["Stats"],
    }),
  }),
});

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
} = api;
