export const formatAmount = (amount: number, type: string) => {
  const sign = type === "income" ? "+" : "-";
  return `${sign}${amount.toLocaleString()}UAH`;
};

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("ru-RU");