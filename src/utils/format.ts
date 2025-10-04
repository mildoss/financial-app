export const formatAmount = (amount: number, type: string) => {
  const sign = type === "income" ? "+" : "-";
  return `${sign}${amount.toLocaleString()}UAH`;
};

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("ru-RU");

export const formatDateInput = (isoDate: string) => {
  const d = new Date(isoDate);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};