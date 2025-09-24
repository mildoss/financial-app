import styles from './TransactionsList.module.css';
import type {Transaction} from "../../types.ts";
import {useDeleteTransactionMutation} from "@store/api.ts";

interface Props {
  transactions: Transaction[];
  currentFilter: 'all' | 'income' | 'expense';
  onFilterChange: (filter: 'all' | 'income' | 'expense') => void;
}

export const TransactionsList = ({ transactions, currentFilter, onFilterChange }:Props) => {
  const [deleteTransaction] = useDeleteTransactionMutation();
  const formatAmount = (amount: number, type: string) => {
    const sign = type === 'income' ? '+' : '-';
    return `${sign}${amount.toLocaleString()}UAH`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const handleDelete = (id: number) => {
    deleteTransaction(id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Latest transactions</h3>
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${currentFilter === 'all' ? styles.active : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
          <button
            className={`${styles.filterBtn} ${currentFilter === 'income' ? styles.active : ''}`}
            onClick={() => onFilterChange('income')}
          >
            Income
          </button>
          <button
            className={`${styles.filterBtn} ${currentFilter === 'expense' ? styles.active : ''}`}
            onClick={() => onFilterChange('expense')}
          >
            Expense
          </button>
        </div>
      </div>
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
            {transactions.map(transaction => (
              <tr key={transaction.id} className={styles.tableRow}>
                <td className={styles.description}>
                  {transaction.description}
                </td>
                <td className={styles.type}>
                  <span className={`${styles.typeBadge} ${styles[transaction.type]}`}>
                    {transaction.type === 'income' ? '💰 Income' : '💸 Expenses'}
                  </span>
                </td>
                <td className={`${styles.amount} ${styles[transaction.type]}`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </td>
                <td className={styles.date}>
                  {formatDate(transaction.date)}
                </td>
                <td className={styles.actions}>
                  {/*<button className={styles.editBtn}>✏️</button>*/}
                  <button onClick={() => handleDelete(transaction.id)} className={styles.deleteBtn}>🗑️</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      ): <h2 style={{padding: '0.5rem'}}>No transaction</h2>}

      <div className={styles.mobileCards}>
        {transactions.map(transaction => (
          <div key={transaction.id} className={styles.mobileCard}>
            <div className={styles.cardHeader}>
              <span className={`${styles.cardType} ${styles[transaction.type]}`}>
                {transaction.type === 'income' ? '💰' : '💸'}
              </span>
              <span className={styles.cardDescription}>
                {transaction.description}
              </span>
            </div>
            <div className={styles.cardFooter}>
              <span className={`${styles.cardAmount} ${styles[transaction.type]}`}>
                {formatAmount(transaction.amount, transaction.type)}
              </span>
              <span className={styles.cardDate}>
                {formatDate(transaction.date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};