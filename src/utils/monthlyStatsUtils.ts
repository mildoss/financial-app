import type { MonthlyData } from "../types.ts";

export const getMonthlyStats = (months: MonthlyData[]): {
  bestMonth: MonthlyData | null;
  worstMonth: MonthlyData | null;
  mostTransactionsMonth: MonthlyData | null;
} => {
  if (months.length === 0) {
    return { bestMonth: null, worstMonth: null, mostTransactionsMonth: null };
  }

  const bestMonth = months.reduce((a, b) => (a.income > b.income ? a : b));
  const worstMonth = months.reduce((a, b) => (a.balance < b.balance ? a : b));

  const mostTransactionsMonth = months.reduce(
    (a, b) => (a.transactions_count > b.transactions_count ? a : b)
  );

  return { bestMonth, worstMonth, mostTransactionsMonth };
};