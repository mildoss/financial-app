import type { TransactionFilter } from "types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store.ts";

interface FilterSlices {
  transactions: TransactionFilter;
}

const initialState: FilterSlices = {
  transactions: {
    type: "all",
    dateFrom: null,
    dateTo: null,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTransactionFilter: (
      state,
      action: PayloadAction<Partial<TransactionFilter>>,
    ) => {
      state.transactions = { ...state.transactions, ...action.payload };
    },
    resetTransactionFilter: (state) => {
      state.transactions = initialState.transactions;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters.transactions;
export const { setTransactionFilter, resetTransactionFilter } =
  filtersSlice.actions;
export default filtersSlice.reducer;
