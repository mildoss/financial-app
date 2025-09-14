export const validateName = (name: string): string | null => {
  if (!name.trim()) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (name.length > 20) return "Name must be less than 20 characters";
  return null;
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email address";
  return null;
};


export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateRegisterForm = (values: { name: string; email: string; password: string }) => ({
  name: validateName(values.name),
  email: validateEmail(values.email),
  password: validatePassword(values.password),
});

export const validateLoginForm = (values: { email: string; password: string }) => ({
  email: validateEmail(values.email),
  password: validatePassword(values.password),
});
