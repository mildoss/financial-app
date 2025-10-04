import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["Transactions", "Stats"],
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
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
