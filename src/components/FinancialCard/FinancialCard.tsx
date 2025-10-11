import styles from "./FinancialCard.module.css"

interface Props {
  icon: string;
  label: string;
  value: number;
  type?: "income" | "expense" | "balance" | "neutral";
}

export const FinancialCard = ({ icon, label, value, type }: Props) => {

  const getValueClass = () => {
    switch (type) {
      case 'income':
        return styles.income
      case 'expense':
        return styles.expense
      case 'balance':
        return styles.balance
      default:
        return styles.neutral
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardContent}>
        <p className={styles.cardLabel}>{label}</p>
        <p className={`${styles.cardValue} ${getValueClass()}`}>{value}UAH</p>
      </div>
    </div>
  )
};
