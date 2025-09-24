import {useGetStatsQuery, useGetTransactionsQuery} from "@store/api.ts";
import {useState} from "react";
import {BalanceChart} from "@components/BalanceChart.tsx";
import styles from './DashboardPage.module.css'
import {QuickAddTransaction} from "@components/QuickAddTransaction/QuickAddTransaction.tsx";
import {TransactionsList} from "@components/TransactionList/TransactionsList.tsx";

export type TransactionType = 'all' | 'income' | 'expense';

export const DashboardPage = () => {
  const [filter,setFilter] = useState<TransactionType>('all');
  const {data: transData} = useGetTransactionsQuery({type: filter});
  const {data: statsData} = useGetStatsQuery();

  const overview = statsData?.overview;
  const transactions = transData?.transactions;

  return (
    <div className="page">
      <div className="page-container">
        <div className={styles.chartWrapper}>
          {overview && (overview.balance || overview.total_income || overview.total_expenses) ? (
            <div>
              <BalanceChart
                balance={overview.balance}
                income={overview.total_income}
                expenses={overview.total_expenses}
              />
            </div>
          ): null}
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
        <QuickAddTransaction/>
        {transactions && (
        <TransactionsList transactions={transactions} currentFilter={filter} onFilterChange={setFilter}/>
      )}
      </div>
    </div>
  )
}