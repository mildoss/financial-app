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

export const validateAmount = (amount: string): string | null => {
  const amountRegex = /^[0-9]+$/;
  if (!amountRegex.test(amount)) {
    return "Enter numbers only";
  }
  return null;
}

export const validateDescription = (description: string): string | null => {
  if (description.length > 20) {
    return "Maximum 20 characters";
  }
  return null;
}

export const validateType = (type: string): string | null => {
  if (type !== 'income' && type !== 'expense') {
    return 'Type is incorrect';
  }
  return null;
}

export const validateDate = (date: string): string | null => {
  const inputDate = new Date(date);
  const now = new Date();

  // Приводим к дате без времени
  const inputDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const twoMonthsAgo = new Date(today);
  twoMonthsAgo.setMonth(today.getMonth() - 2);

  if (inputDay > today) {
    return "The date cannot be later than the current one.";
  }

  if (inputDay < twoMonthsAgo) {
    return "The date cannot be older than 2 months.";
  }

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

export const validateTransactionForm = (values: {
  amount: string;
  description: string;
  type:  string;
  date: string;
}) => ({
  amount: validateAmount(values.amount),
  description: validateDescription(values.description),
  type: validateType(values.type),
  date: validateDate(values.date)
});