interface ApiError {
  data?: {
    error?: string;
  };
  message?: string;
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage = "Server error",
): string => {
  if (error && typeof error === "object") {
    const apiError = error as ApiError;

    if (apiError.data?.error) return apiError.data.error;
    if (apiError.message) return apiError.message;
  }
  return defaultMessage;
};
