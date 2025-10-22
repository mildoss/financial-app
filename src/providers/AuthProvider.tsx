import { type ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "@store/api";
import {logout, setUser} from "@store/authSlice";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const { data: user, error } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else if (error) {
      // ✅ Если токен невалидный - чистим
      localStorage.removeItem('token');
      dispatch(logout());
    }
  }, [user, error, dispatch,token]);

  return <>{children}</>;
};
