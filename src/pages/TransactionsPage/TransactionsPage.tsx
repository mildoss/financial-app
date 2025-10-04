import { TransactionsList } from "@components/index";
import { useState } from "react";
import { useGetTransactionsQuery } from "@store/api.ts";
import type { TransactionFilter } from "../../types.ts";

export const TransactionsPage = () => {
  const [filter, setFilter] = useState<TransactionFilter>({
    type: "all",
    dateFrom: null,
    dateTo: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data: transData } = useGetTransactionsQuery({
    type: filter.type,
    dateFrom: filter.dateFrom,
    dateTo: filter.dateTo,
    limit: 20,
    page: currentPage,
  });

  const transactions = transData?.transactions;
  const pagination = transData?.pagination;

  const handleFilterChange = (newFilter: Partial<TransactionFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
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
