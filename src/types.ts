export interface User {
  id: number,
  name: string;
  email: string;
  created_at: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user : User;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user : User;
  message: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

export type TransactionType = 'all' | 'income' | 'expense';

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: string;
  date: string;
  created_at: string;
}

export interface TransactionFilter {
  type: 'all' | 'income' | 'expense';
  dateFrom?: string | null;
  dateTo?: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface TransactionsResponse {
  message?: string;
  transactions: Transaction[];
  pagination?: Pagination;
}

export interface TransactionRequest {
  id?: number;
  amount: number;
  description: string;
  type: string;
  date: string;
}

export interface Overview {
  balance: number;
  total_income: number;
  total_expenses: number;
  total_transactions: number;
}

export interface CurrentMonth {
  income: number;
  expenses: number;
  transactions: number;
  balance: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
}

export interface StatsResponse {
  overview: Overview;
  current_month: CurrentMonth;
  top_expense_categories: ExpenseCategory[];
  recent_transactions: Transaction[];
}