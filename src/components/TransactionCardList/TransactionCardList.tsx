import { useDeleteTransactionMutation } from "@store/api.ts";
import type { Transaction } from "types.ts";
import { formatAmount, formatDate } from "@utils/format.ts";
import styles from "./TransactionCardList.module.css";
import {showToast} from "@store/toastSlice.ts";
import {useDispatch} from "react-redux";
import {getErrorMessage} from "@utils/errorUtils.ts";

interface Props {
  transactions: Transaction[];
  setSelectedTransaction: (value: Transaction) => void;
  setIsOpenModal: (value: boolean) => void;
}

export const TransactionCardList = ({
  transactions,
  setSelectedTransaction,
  setIsOpenModal,
}: Props) => {
  const dispatch = useDispatch();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id).unwrap();
      dispatch(showToast({ message: "Deleted successfully", type: "success" }));
    } catch (err) {
      dispatch(showToast({ message: getErrorMessage(err), type: "error" }));
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsOpenModal(true);
  };

  return (
    <div className={styles.mobileCards}>
      {transactions.map((transaction) => (
        <div key={transaction.id} className={styles.mobileCard}>
          <div className={styles.cardHeader}>
            <div className={styles.infoGroup}>
              <span
                className={`${styles.cardType} ${styles[transaction.type]}`}
              >
                {transaction.type === "income" ? "💰" : "💸"}
              </span>
              <span className={styles.cardDescription}>
                {transaction.description}
              </span>
            </div>
            <div className={styles.btnGroup}>
              <span
                onClick={() => handleEdit(transaction)}
                className={styles.editBtn}
              >
                ✏️
              </span>
              <span
                onClick={() => handleDelete(transaction.id)}
                className={styles.deleteBtn}
              >
                🗑️
              </span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span
              className={`${styles.cardAmount} ${styles[transaction.type]}`}
            >
              {formatAmount(transaction.amount, transaction.type)}
            </span>
            <span className={styles.cardDate}>
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
