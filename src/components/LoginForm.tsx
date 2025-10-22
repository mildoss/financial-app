import { type ChangeEvent, type FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import type { LoginRequest } from "../types.ts";
import { useGetCurrentUserQuery, useLoginMutation } from "@store/api.ts";
import { validateLoginForm } from "@utils/validators.ts";
import { getErrorMessage } from "@utils/errorUtils.ts";
import "@styles/page.css";
import "@styles/form.css";
import { showToast } from "@store/toastSlice.ts";
import {setUser} from "@store/authSlice.ts";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const { refetch } = useGetCurrentUserQuery();
  const [login, { isLoading, error }] = useLoginMutation();

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

    const errors = validateLoginForm(formData);
    setFormErrors({
      email: errors.email ?? undefined,
      password: errors.password ?? undefined,
    });

    if (errors.email || errors.password) {
      return;
    }

    try {
      await login(formData).unwrap();
      const {data:user} = await refetch();
      if (user) {
        dispatch(setUser(user));
      }
    } catch (err) {
      dispatch(showToast({ message: getErrorMessage(err), type: "error" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <div className="error">{getErrorMessage(error)}</div>}
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
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};
