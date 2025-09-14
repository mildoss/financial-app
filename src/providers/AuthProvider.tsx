import {useDispatch} from "react-redux";
import {type ReactNode, useEffect} from "react";
import {useGetCurrentUserQuery} from "@store/api";
import {setUser} from "@store/authSlice";

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const {data: user, isLoading,error} = useGetCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else if (error) {
      console.log(error)
    }
  }, [user,isLoading,error]);

  return <>{children}</>
}