import { FinancialCard, Spinner } from "@components/index.ts";
import styles from "./StatsPage.module.css";
import { MonthlyChart } from "@components/MonthlyChart.tsx";
import { useStatsData } from "@hooks/index.ts";

export const StatsPage = () => {
  const { isLoading, overview, currentMonth, monthlyData, year, monthlyStats } =
    useStatsData();

  if (isLoading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-container">
        <div className={styles.statsCard}>
          <h2 className={styles.title}>General</h2>
          {overview && (
            <div className={styles.metricsGrid}>
              <FinancialCard
                icon={"💰"}
                label="Income"
                type="income"
                value={overview.total_income}
              />
              <FinancialCard
                icon="💵"
                label="Balance"
                type="balance"
                value={overview.balance}
              />
              <FinancialCard
                icon="💸"
                label="Expenses"
                type="expense"
                value={overview.total_expenses}
              />
            </div>
          )}
          {currentMonth && (
            <div className={styles.section}>
              <h2 className={styles.title}>Current month</h2>
              <div className={styles.metricsRow}>
                <FinancialCard
                  icon="💰"
                  label="Income"
                  type="income"
                  value={currentMonth.income}
                />
                <FinancialCard
                  icon="💸"
                  label="Expenses"
                  type="expense"
                  value={currentMonth.expenses}
                />
              </div>
            </div>
          )}
        </div>
        <MonthlyChart chartData={monthlyData} year={year} />
        <div className={styles.metricsRow}>
          <FinancialCard
            icon={"💰"}
            label={`Most income month: ${monthlyStats.bestMonth?.month_name ?? ""}`}
            type="income"
            value={monthlyStats.bestMonth?.income ?? 0}
          />
          <FinancialCard
            icon={"💸"}
            label={`Most expenses month: ${monthlyStats.worstMonth?.month_name ?? ""}`}
            type="expense"
            value={monthlyStats.worstMonth?.expenses ?? 0}
          />
          <FinancialCard
            icon={"💳"}
            label={`Most transaction month: ${monthlyStats.mostTransactionsMonth?.month_name ?? ""}`}
            type="neutral"
            value={monthlyStats.mostTransactionsMonth?.transactions_count ?? 0}
          />
        </div>
      </div>
    </div>
  );
};
