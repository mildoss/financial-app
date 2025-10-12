import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTransactionsQuery } from "@store/api.ts";
import { selectFilters, setTransactionFilter } from "@store/filtersSlice.ts";
import type { TransactionFilter } from "types.ts";
import { TransactionsList, Spinner } from "@components/index";
import { showToast } from "@store/toastSlice.ts";

export const TransactionsPage = () => {
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: transData,
    isLoading: transLoading,
    isError: transError,
  } = useGetTransactionsQuery({
    type: filter.type,
    dateFrom: filter.dateFrom,
    dateTo: filter.dateTo,
    limit: 20,
    page: currentPage,
  });

  useEffect(() => {
    if (transError) {
      dispatch(
        showToast({ message: "Failed to load transactions", type: "error" }),
      );
    }
  }, [transError, dispatch]);

  const transactions = transData?.transactions;
  const pagination = transData?.pagination;

  if (transLoading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  const handleFilterChange = (newFilter: Partial<TransactionFilter>) => {
    dispatch(setTransactionFilter(newFilter));
    setCurrentPage(1);
  };
  return (
    <div className="page">
      <div className="page-container">
        {transactions && pagination && (
          <TransactionsList
            transactions={transactions}
            pagination={pagination}
            filter={filter}
            onFilterChange={handleFilterChange}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
