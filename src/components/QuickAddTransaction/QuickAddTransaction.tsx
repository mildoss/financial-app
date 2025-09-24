import "@styles/form.css"
import styles from './QuickAddTransaction.module.css'
import {type ChangeEvent, type FormEvent, useState} from "react";
import {useCreateTransactionMutation} from "@store/api.ts";
import {getErrorMessage} from "@utils/errorUtils.ts";
import {validateTransactionForm} from "@utils/validators.ts";

export const QuickAddTransaction = () => {
  const [formErrors, setFormErrors] = useState<{ amount?: string; description?: string; type?: string; date?: string; }>({});
  const [transaction, {isLoading,error}] = useCreateTransactionMutation();

  const initialFormData = {
    amount: '',
    description: '',
    type: '',
    date: ''
  };

  const [formData,setFormData] = useState(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name,value} = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setFormErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  }

  const handleSubmit = async (e: FormEvent)=> {
    e.preventDefault();

    const errors = validateTransactionForm(formData);

    setFormErrors({
      amount: errors.amount ?? undefined,
      description: errors.description ?? undefined,
      type: errors.type ?? undefined,
      date: errors.date ?? undefined
    });

    if (errors.amount || errors.description || errors.type || errors.date) {
      return;
    }

    try {
      const payload = {
        ...formData, amount: formData.amount ? Number(formData.amount) : 0
      }
      await transaction(payload).unwrap();
      setFormData(initialFormData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className="error">
        {getErrorMessage(error)}
      </div>
      }
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
        {formErrors.description && <p className="error">{formErrors.description}</p>}
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
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        {formErrors.date && <p className="error">{formErrors.date}</p>}
        </div>
    </form>
  )
}