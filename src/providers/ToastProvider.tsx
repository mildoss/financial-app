import React, { type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "@store/toastSlice.ts";
import type { RootState } from "@store/store.ts";
import { Toast } from "@components/Toast/Toast.tsx";

interface Props {
  children: ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const dispatch = useDispatch();

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    zIndex: 9999,
  };

  return (
    <>
      {children}
      <div style={containerStyle}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => dispatch(removeToast(t.id))}
          />
        ))}
      </div>
    </>
  );
};
