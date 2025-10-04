import "@styles/form.css";
import styles from "./TransactionForm.module.css";
import React, {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "@store/api.ts";
import { getErrorMessage } from "@utils/errorUtils.ts";
import { validateTransactionForm } from "@utils/validators.ts";
import type { Transaction } from "types.ts";
import { isChangedTransaction } from "@utils/changedUtils.ts";

interface Props {
  transaction?: Transaction | null;
  isOpen?: boolean;
  setIsOpen?: (b: boolean) => void;
}

export const TransactionForm = ({ transaction, isOpen, setIsOpen }: Props) => {
  const [formErrors, setFormErrors] = useState<{
    amount?: string;
    description?: string;
    type?: string;
    date?: string;
  }>({});
  const [message, setMessage] = useState("");
  const [
    createTransaction,
    { isLoading: isLoadingCreate, error: errorCreate },
  ] = useCreateTransactionMutation();
  const [
    updateTransaction,
    { isLoading: isLoadingUpdate, error: errorUpdate },
  ] = useUpdateTransactionMutation();

  const toLocalDateInput = (isoDate: string) => {
    const d = new Date(isoDate);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (transaction && isOpen) {
      setFormData({
        amount: transaction.amount.toString(),
        description: transaction.description,
        type: transaction.type,
        date: toLocalDateInput(transaction.date),
      });
      setFormErrors({});
    }
  }, [transaction, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const initialFormData = {
    amount: "",
    description: "",
    type: "",
    date: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen!(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateTransactionForm(formData);

    setFormErrors({
      amount: errors.amount ?? undefined,
      description: errors.description ?? undefined,
      type: errors.type ?? undefined,
      date: errors.date ?? undefined,
    });

    if (errors.amount || errors.description || errors.type || errors.date) {
      return;
    }

    try {
      const payload = {
        ...formData,
        amount: formData.amount ? Number(formData.amount) : 0,
      };
      if (transaction) {
        const response = await updateTransaction({
          id: transaction.id,
          transaction: payload,
        }).unwrap();
        setMessage(response.message!);
        setIsOpen!(false);
      } else {
        await createTransaction(payload).unwrap();
        setFormData(initialFormData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={transaction ? styles.overlay : ""}
      onClick={transaction ? handleOverlayClick : undefined}
    >
      <div className={transaction ? styles.modal : ""}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {errorCreate && (
            <div className="error">{getErrorMessage(errorCreate)}</div>
          )}
          <div className="inputGroup">
            <label className={styles.label} htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className="input"
              placeholder="100"
              required
            />
            {formErrors.amount && <p className="error">{formErrors.amount}</p>}
          </div>
          <div className="inputGroup">
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="input"
              placeholder="Description"
              required
            />
            {formErrors.description && (
              <p className="error">{formErrors.description}</p>
            )}
          </div>
          <div className="inputGroup">
            <label className={styles.label} htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {formErrors.type && <p className="error">{formErrors.type}</p>}
          </div>
          <div className="inputGroup">
            <label className={styles.label} htmlFor="date">
              Date
            </label>
            <div className="inputGroupRow">
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="input"
                required
              />

              <button
                className="btn-add"
                disabled={
                  transaction
                    ? !isChangedTransaction(transaction, formData) ||
                      isLoadingUpdate
                    : isLoadingCreate
                }
              >
                {transaction
                  ? isLoadingUpdate
                    ? "Updating..."
                    : "Update"
                  : isLoadingCreate
                    ? "Creating..."
                    : "Create"}
              </button>
            </div>
            {formErrors.date && <p className="error">{formErrors.date}</p>}
          </div>
          {errorUpdate && (
            <div className="error">{getErrorMessage(errorUpdate)}</div>
          )}
          {message && <div className="message">{message}</div>}
          {transaction && (
            <button className="btn-primary" onClick={() => setIsOpen!(false)}>
              Close
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
