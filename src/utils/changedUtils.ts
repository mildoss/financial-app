import type { Transaction } from "../types.ts";

interface FormData {
  amount: string;
  description: string;
  type: string;
  date: string;
}

const toLocalDateInput = (isoDate: string) => {
  const d = new Date(isoDate);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isChangedTransaction = (
  transaction: Transaction | null,
  formData: FormData,
): boolean => {
  if (!transaction) return true;

  return (
    Number(formData.amount) !== transaction.amount ||
    formData.description !== transaction.description ||
    formData.type !== transaction.type ||
    formData.date !== toLocalDateInput(transaction.date)
  );
};
