import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import { selectCurrentUser } from "@store/authSlice";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectCurrentUser);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
