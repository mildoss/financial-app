import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ToastSlice {
  toasts: { id: string; message: string; type: "success" | "error" }[];
}

const initialState: ToastSlice = {toasts: []};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" }>,
    ) => {
      state.toasts.push({
        id: Date.now().toString(),
        message: action.payload.message,
        type: action.payload.type
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    }
  },
});

export const {showToast,removeToast} = toastSlice.actions;
export default toastSlice.reducer;