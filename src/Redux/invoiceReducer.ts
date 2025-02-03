import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Data } from "../types/AppDataType";

type invoiceState = {
  FilterBy: string;
  invoiceList: Data;
  invoiceDataHasAlreadyBeenLoaded: boolean;
  deleteInvoiceWithId?: string;
  availableInvoices: number;
  editInvoice: boolean;
  addNewInvoice: boolean;
};

const initialState: invoiceState = {
  FilterBy: "",
  invoiceList: [],
  invoiceDataHasAlreadyBeenLoaded: false,
  availableInvoices: 0,
  editInvoice: false,
  addNewInvoice: false,
};

const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    FilterInvoice: (state, action: PayloadAction<string>) => {
      state.FilterBy = action.payload;
    },

    updateAvailableNumberOfInvoices: (state, action: PayloadAction<number>) => {
      const updatedState = {
        ...state,
        availableInvoices: action.payload,
      };

      return updatedState;
    },

    updateInvoiceToBeDeleted: (state, action: PayloadAction<string>) => {
      state.deleteInvoiceWithId = action.payload;
    },

    editInvoice: (state, action: PayloadAction<boolean>) => {
      state.editInvoice = action.payload;
    },

    addNewInvoice: (state, action: PayloadAction<boolean>) => {
      state.addNewInvoice = action.payload;
    },

    reset: () => {
      return initialState;
    },
  },
});

export const {
  editInvoice,
  addNewInvoice,
  FilterInvoice,
  reset,
  updateInvoiceToBeDeleted,
  updateAvailableNumberOfInvoices,
} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
