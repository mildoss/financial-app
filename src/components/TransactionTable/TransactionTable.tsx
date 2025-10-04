import { useDeleteTransactionMutation } from "@store/api.ts";
import type { Transaction } from "types.ts";
import { formatAmount, formatDate } from "@utils/format.ts";
import styles from "./TransactionTable.module.css";

interface Props {
  transactions: Transaction[];
  setSelectedTransaction: (value: Transaction) => void;
  setIsOpenModal: (value: boolean) => void;
}

export const TransactionTable = ({
  transactions,
  setSelectedTransaction,
  setIsOpenModal,
}: Props) => {
  const [deleteTransaction] = useDeleteTransactionMutation();
  const handleDelete = (id: number) => {
    deleteTransaction(id);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsOpenModal(true);
  };

  return (
    <>
      {transactions.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.descriptionCol}>Description</th>
                <th className={styles.typeCol}>Type</th>
                <th className={styles.amountCol}>Amount</th>
                <th className={styles.dateCol}>Date</th>
                <th className={styles.actionsCol}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className={styles.tableRow}>
                  <td className={styles.description}>
                    {transaction.description}
                  </td>
                  <td className={styles.type}>
                    <span
                      className={`${styles.typeBadge} ${styles[transaction.type]}`}
                    >
                      {transaction.type === "income"
                        ? "💰 Income"
                        : "💸 Expenses"}
                    </span>
                  </td>
                  <td
                    className={`${styles.amount} ${styles[transaction.type]}`}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </td>
                  <td className={styles.date}>
                    {formatDate(transaction.date)}
                  </td>
                  <td className={styles.actions}>
                    <button
                      onClick={() => handleEdit(transaction)}
                      className={styles.editBtn}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className={styles.deleteBtn}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 style={{ padding: "0.5rem" }}>No transaction</h2>
      )}
    </>
  );
};
