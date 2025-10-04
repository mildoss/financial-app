import { useGetStatsQuery, useGetTransactionsQuery } from "@store/api.ts";
import { useState } from "react";
import { BalanceChart } from "@components/BalanceChart.tsx";
import styles from "./DashboardPage.module.css";
import { TransactionForm, TransactionsList } from "@components/index";
import type { TransactionFilter } from "types.ts";

export const DashboardPage = () => {
  const [filter, setFilter] = useState<TransactionFilter>({
    type: "all",
    dateFrom: null,
    dateTo: null,
  });
  const { data: transData } = useGetTransactionsQuery({
    type: filter.type,
    limit: 10,
    page: 1,
  });
  const { data: statsData } = useGetStatsQuery();

  const overview = statsData?.overview;
  const transactions = transData?.transactions;

  const handleFilterChange = (newFilter: Partial<TransactionFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className={styles.chartWrapper}>
          {overview &&
          (overview.balance ||
            overview.total_income ||
            overview.total_expenses) ? (
            <div>
              <BalanceChart
                balance={overview.balance}
                income={overview.total_income}
                expenses={overview.total_expenses}
              />
            </div>
          ) : null}
          {/*{overview && (*/}
          {/*  <div>*/}
          {/*    <BalanceChart*/}
          {/*      balance={overview.balance}*/}
          {/*      income={overview.total_income}*/}
          {/*      expenses={overview.total_expenses}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*)}*/}
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
