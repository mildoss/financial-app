import styles from './TransactionsList.module.css';
import type {Transaction, Pagination as PaginationType, TransactionFilter} from "types.ts";
import {useDeleteTransactionMutation} from "@store/api.ts";
import {Pagination} from "@components/index";
import {useState} from "react";
import {TransactionForm} from "@components/index";

interface Props {
  transactions: Transaction[];
  pagination?: PaginationType;
  filter: TransactionFilter;
  onFilterChange: (filter: Partial<TransactionFilter>) => void;
  onPageChange?: (page:number) => void;
}

export const TransactionsList = ({ transactions, pagination, filter, onFilterChange, onPageChange }:Props) => {
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [openModal,setIsOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
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

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsOpenModal(true);
  }

  const onResetFilters = () => {
    onFilterChange({
      type: 'all',
      dateTo: '',
      dateFrom: ''
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {pagination
          ?
          <h3 className={styles.title}>Transaction history</h3>
          :
          <h3 className={styles.title}>Latest transactions</h3>
        }
        <div className={styles.filters}>
          {pagination ? (
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
              <div className={styles.inputGroup}>
                <label htmlFor="dateFrom">From</label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  className="input"
                  value={filter.dateFrom || ''}
                  onChange={(e) => onFilterChange({dateFrom: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="dateTo">To</label>
                <input
                  type="date"
                  className="input"
                  id="dateTo"
                  name="dateTo"
                  value={filter.dateTo || ''}
                  onChange={(e) => onFilterChange({dateTo: e.target.value})}
                />
              </div>
            </div>


          ) : null}
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button
              className={`${styles.filterBtn} ${filter.type === 'all' ? styles.active : ''}`}
              onClick={() => onFilterChange({type: 'all'})}
            >
              All
            </button>
            <button
              className={`${styles.filterBtn} ${filter.type === 'income' ? styles.active : ''}`}
              onClick={() => onFilterChange({type: 'income'})}
            >
              Income
            </button>
            <button
              className={`${styles.filterBtn} ${filter.type === 'expense' ? styles.active : ''}`}
              onClick={() => onFilterChange({type: 'expense'})}
            >
              Expense
            </button>
            {(filter.dateFrom || filter.dateTo) && (
              <button
                className={styles.filterBtn}
                onClick={onResetFilters}
              > Reset
              </button>
            )}
          </div>
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
                  <button onClick={() => handleEdit(transaction)} className={styles.editBtn}>✏️</button>
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
              <div className={styles.infoGroup}>
                <span className={`${styles.cardType} ${styles[transaction.type]}`}>
                {transaction.type === 'income' ? '💰' : '💸'}
              </span>
                <span className={styles.cardDescription}>
                {transaction.description}
              </span>
              </div>
              <div className="btnGroup">
                <span onClick={() => handleEdit(transaction)} className={styles.editBtn}>✏️</span>
                <span onClick={() => handleDelete(transaction.id)} className={styles.deleteBtn}>🗑️</span>
              </div>
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
      {pagination && onPageChange &&
        <Pagination currentPage={pagination.page} totalPages={pagination.pages} onPageChange={onPageChange}/>
      }
      {openModal &&
        <TransactionForm transaction={selectedTransaction} isOpen={openModal} setIsOpen={setIsOpenModal}/>
      }
    </div>
  );
};