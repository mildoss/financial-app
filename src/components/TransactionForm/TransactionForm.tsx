import React, {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import "@styles/form.css";
import styles from "./TransactionForm.module.css";
import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "@store/api.ts";
import { getErrorMessage } from "@utils/errorUtils.ts";
import { validateTransactionForm } from "@utils/validators.ts";
import { isChangedTransaction } from "@utils/changedUtils.ts";
import { formatDateInput } from "@utils/format.ts";
import type { Transaction } from "types.ts";
import { showToast } from "@store/toastSlice.ts";
import { useDispatch } from "react-redux";

interface Props {
  transaction?: Transaction | null;
  isOpen?: boolean;
  setIsOpen?: (b: boolean) => void;
}

export const TransactionForm = ({ transaction, isOpen, setIsOpen }: Props) => {
  const isEditMode = !!transaction;
  const isModalMode = isEditMode || isOpen;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    type: "",
    date: "",
  });
  const [formErrors, setFormErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [createTransaction, { isLoading: isCreating, error: createError }] =
    useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating, error: updateError }] =
    useUpdateTransactionMutation();

  const isLoading = isCreating || isUpdating;
  const error = createError || updateError;

  useEffect(() => {
    if (isModalMode) {
      if (isEditMode && transaction) {
        setFormData({
          amount: transaction.amount.toString(),
          description: transaction.description,
          type: transaction.type,
          date: formatDateInput(transaction.date),
        });
      }
      setFormErrors({});
    }
  }, [isEditMode, isModalMode, transaction]);

  useEffect(() => {
    if (isModalMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalMode]);

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

  const handleClose = () => {
    setIsOpen?.(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
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
        amount: Number(formData.amount),
      };
      if (isEditMode && transaction) {
        await updateTransaction({
          id: transaction.id,
          transaction: payload,
        }).unwrap();
        dispatch(
          showToast({ message: "Updated successfully", type: "success" }),
        );
        handleClose();
      } else {
        await createTransaction(payload).unwrap();
        dispatch(
          showToast({ message: "Create successfully", type: "success" }),
        );
        setFormData({
          amount: "",
          description: "",
          type: "",
          date: "",
        });
      }
    } catch (err) {
      dispatch(
        showToast({
          message: getErrorMessage(err, "Something went wrong"),
          type: "error",
        }),
      );
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className="error">{getErrorMessage(error)}</div>}

      <div className="inputGroup">
        <label className={styles.label} htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
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
          <option value="expense">Expenses</option>
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
            type="submit"
            className="btn-add"
            disabled={
              isLoading ||
              (isEditMode && !isChangedTransaction(transaction, formData))
            }
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update"
                : "Create"}
          </button>
        </div>
        {formErrors.date && <p className="error">{formErrors.date}</p>}
      </div>
    </form>
  );

  if (isModalMode) {
    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
          {renderForm()}
          <span className={styles.span} onClick={handleClose}>
            ❌
          </span>
        </div>
      </div>
    );
  }
  return renderForm();
};
