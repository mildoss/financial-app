import type {ReactNode} from "react";
import {store} from "../store/store.ts";
import {Provider} from "react-redux";

export const StoreProvider =({children}: {children: ReactNode}) => {
  return <Provider store={store}>{children}</Provider>
}