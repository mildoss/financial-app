import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetStatsQuery } from "@store/api.ts";
import { showToast } from "@store/toastSlice.ts";
import { FinancialCard, Spinner } from "@components/index.ts";
import styles from "./StatsPage.module.css";

export const StatsPage = () => {
  const dispatch = useDispatch();
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetStatsQuery();
  const overview = statsData?.overview;
  const currentMonth = statsData?.current_month;

  useEffect(() => {
    if (statsError) {
      dispatch(
        showToast({ message: "Failed to load transactions", type: "error" }),
      );
    }
  }, [statsError, dispatch]);

  if (statsLoading) {
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
