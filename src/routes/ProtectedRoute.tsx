import {useSelector} from "react-redux";
import {selectCurrentUser} from "../store/authSlice.ts";
import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";

export const ProtectedRoute = ({children}: {children: ReactNode}) => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to='/login' replace/>
  }

  return <>{children}</>
}