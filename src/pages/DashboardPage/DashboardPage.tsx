import { useState } from "react";
import { useGetStatsQuery, useGetTransactionsQuery } from "@store/api.ts";
import type { TransactionFilter } from "types.ts";
import {
  BalanceChart,
  TransactionForm,
  TransactionsList,
  Spinner,
} from "@components/index";
import styles from "./DashboardPage.module.css";

export const DashboardPage = () => {
  const [filter, setFilter] = useState<TransactionFilter>({
    type: "all",
    dateFrom: null,
    dateTo: null,
  });
  const { data: transData, isLoading: transLoading } = useGetTransactionsQuery({
    type: filter.type,
    limit: 10,
    page: 1,
  });
  const { data: statsData, isLoading: statsLoading } = useGetStatsQuery();

  const overview = statsData?.overview;
  const currentMonth = statsData?.current_month;
  const transactions = transData?.transactions;

  const handleFilterChange = (newFilter: Partial<TransactionFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  if (statsLoading || transLoading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-container">
        <div className={styles.chartWrapper}>
          {overview &&
          (overview.balance ||
            overview.total_income ||
            overview.total_expenses ||
            overview.total_transactions) ? (
            <div className={styles.chartContent}>
              <div>
                <BalanceChart
                  balance={overview.balance}
                  income={overview.total_income}
                  expenses={overview.total_expenses}
                />
              </div>
              <h1 className={styles.title}>
                Total transactions: {overview.total_transactions}
              </h1>
            </div>
          ) : null}
          {currentMonth &&
          (currentMonth.balance ||
            currentMonth.income ||
            currentMonth.expenses ||
            currentMonth.transactions) ? (
            <div className={styles.chartContent}>
              <div>
                <BalanceChart
                  balance={currentMonth.balance}
                  income={currentMonth.income}
                  expenses={currentMonth.expenses}
                />
              </div>
              <h1 className={styles.title}>
                Transactions this month: {currentMonth.transactions}
              </h1>
            </div>
          ) : null}
        </div>

        <TransactionForm />
        {transactions && (
          <TransactionsList
            transactions={transactions}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>
    </div>
  );
};
