import { useState } from "react";
import type {
  Transaction,
  Pagination as PaginationType,
  TransactionFilter,
} from "types.ts";
import {
  Pagination,
  TransactionForm,
  FiltersBlock,
  TransactionTable,
  TransactionCardList,
} from "@components/index";
import styles from "./TransactionsList.module.css";

interface Props {
  transactions: Transaction[];
  pagination?: PaginationType;
  filter: TransactionFilter;
  onFilterChange: (filter: Partial<TransactionFilter>) => void;
  onPageChange?: (page: number) => void;
}

export const TransactionsList = ({
  transactions,
  pagination,
  filter,
  onFilterChange,
  onPageChange,
}: Props) => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {pagination ? "Transaction history" : "Latest transactions"}
        </h3>
        <div className={styles.filters}>
          <FiltersBlock
            filter={filter}
            onFilterChange={onFilterChange}
            pagination={pagination}
          />
        </div>
      </div>
      <TransactionTable
        transactions={transactions}
        setSelectedTransaction={setSelectedTransaction}
        setIsOpenModal={setIsOpenModal}
      />
      <TransactionCardList
        transactions={transactions}
        setSelectedTransaction={setSelectedTransaction}
        setIsOpenModal={setIsOpenModal}
      />
      {pagination && onPageChange && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={onPageChange}
        />
      )}
      {isModalOpen && (
        <TransactionForm
          transaction={selectedTransaction}
          isOpen={isModalOpen}
          setIsOpen={setIsOpenModal}
        />
      )}
    </div>
  );
};
