import { type ChangeEvent, type FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import type { RegisterRequest } from "../types.ts";
import {useGetCurrentUserQuery, useRegisterMutation} from "@store/api.ts";
import { showToast } from "@store/toastSlice.ts";
import { validateRegisterForm } from "@utils/validators.ts";
import { getErrorMessage } from "@utils/errorUtils.ts";
import "@styles/page.css";
import "@styles/form.css";
import {setUser} from "@store/authSlice.ts";

export const RegisterForm = () => {
  const dispatch = useDispatch();
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
  const { refetch } = useGetCurrentUserQuery();
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
      await register(formData).unwrap();
      const {data:user} = await refetch();
      if (user) {
        dispatch(setUser(user));
      }
      dispatch(
        showToast({ message: "Register successfully", type: "success" }),
      );
      // onChangeActiveTab();
    } catch (err) {
      dispatch(showToast({ message: getErrorMessage(err), type: "error" }));
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
