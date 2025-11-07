import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useGetStatsQuery, useGetStatsMonthlyQuery } from "@store/api.ts";
import { showToast } from "@store/toastSlice.ts";
import { getMonthlyStats } from "@utils/monthlyStatsUtils.ts";

export const useStatsData = () => {
  const dispatch = useDispatch();

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetStatsQuery();

  const {
    data: statsDataMonthly,
    isLoading: statsMonthlyLoading,
    isError: statsMonthlyError,
  } = useGetStatsMonthlyQuery();

  useEffect(() => {
    if (statsError || statsMonthlyError) {
      dispatch(
        showToast({ message: "Failed to load transactions", type: "error" }),
      );
    }
  }, [statsError, statsMonthlyError, dispatch]);

  const overview = useMemo(() => statsData?.overview, [statsData?.overview]);
  const currentMonth = useMemo(
    () => statsData?.current_month,
    [statsData?.current_month],
  );
  const monthlyData = useMemo(
    () => statsDataMonthly?.monthly_data ?? [],
    [statsDataMonthly?.monthly_data],
  );
  const year = useMemo(
    () => statsDataMonthly?.year ?? new Date().getFullYear(),
    [statsDataMonthly?.year],
  );

  const monthlyStats = useMemo(() => {
    if (monthlyData.length === 0) {
      return {
        bestMonth: null,
        worstMonth: null,
        mostTransactionsMonth: null,
      };
    }
    return getMonthlyStats(monthlyData);
  }, [monthlyData]);

  return {
    isLoading: statsLoading || statsMonthlyLoading,
    overview,
    currentMonth,
    monthlyData,
    year,
    monthlyStats,
  };
};
