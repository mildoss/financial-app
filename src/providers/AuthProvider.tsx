import {type ReactNode, useEffect} from "react";
import {useGetCurrentUserQuery} from "../store/api.ts";

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const {data: user, isLoading,error} = useGetCurrentUserQuery();

  useEffect(() => {
    if (user) {
      console.log(user)
    } else if (error) {
      console.log(error)
    }
  }, [user,isLoading,error]);

  return <>{children}</>
}