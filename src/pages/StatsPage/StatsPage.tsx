import { FinancialCard } from "@components/FinancialCard/FinancialCard.tsx";
import { useGetStatsQuery } from "@store/api.ts";
import styles from "./StatsPage.module.css";

export const StatsPage = () => {
  const { data: statsData } = useGetStatsQuery();
  const overview = statsData?.overview;
  const currentMonth = statsData?.current_month;
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
                  icon={"💰"}
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
      </div>
    </div>
  );
};
