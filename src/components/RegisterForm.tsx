import { type ChangeEvent, type FC, type FormEvent, useState } from "react";
import type { RegisterRequest } from "../types.ts";
import { useRegisterMutation } from "@store/api.ts";
import { validateRegisterForm } from "@utils/validators.ts";
import { getErrorMessage } from "@utils/errorUtils.ts";
import "@styles/page.css";
import "@styles/form.css";

interface Props {
  onChangeActiveTab: () => void;
  setMessage: (value: string) => void;
}

export const RegisterForm: FC<Props> = ({ onChangeActiveTab, setMessage }) => {
  const [formData, setFormData] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateRegisterForm(formData);
    setFormErrors({
      name: errors.name ?? undefined,
      email: errors.email ?? undefined,
      password: errors.password ?? undefined,
    });

    if (errors.name || errors.email || errors.password) {
      return;
    }

    try {
      const result = await register(formData).unwrap();
      setMessage(result.message);
      onChangeActiveTab();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <div className="error">{getErrorMessage(error)}</div>}
      <div className="inputGroup">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="input"
          placeholder="John"
          required
        />
        {formErrors.name && <p className="error">{formErrors.name}</p>}
      </div>
      <div className="inputGroup">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          placeholder="your@email.com"
          required
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}
      </div>
      <div className="inputGroup">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="input"
          placeholder="*********"
          required
        />
        {formErrors.password && <p className="error">{formErrors.password}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`submitBtn ${isLoading ? "submitBtnLoading" : ""}`}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};
