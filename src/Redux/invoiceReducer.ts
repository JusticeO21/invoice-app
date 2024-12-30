import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Data, Invoice } from "../types/AppDataType";

type invoiceState = {
    FilterBy: string;
    invoiceList: Data;
    invoiceDataHasAlreadyBeenLoaded: boolean;
    deleteInvoiceWithId?: string;
    availableInvoices: number;
}

const initialState: invoiceState = {
    FilterBy: "",
    invoiceList:[],
    invoiceDataHasAlreadyBeenLoaded: false,
    availableInvoices:0,
}

const InvoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: ({
        FilterInvoice: (state, action: PayloadAction<string>) => { 
            state.FilterBy = action.payload;
            state.availableInvoices = state.invoiceList?.filter((invoice) => {
                return invoice.status == state.FilterBy
            }).length
            
            if(!action.payload) state.availableInvoices = state.invoiceList.length
        },

        loadInvoiceData: (state, action: PayloadAction<Data>) => {
            state.invoiceList = action.payload;
            state.invoiceDataHasAlreadyBeenLoaded = true;
             state.availableInvoices = state.invoiceList.length;
        },

        addInvoice:(state, action: PayloadAction<Invoice>) => {
            state.invoiceList?.push(action.payload)
            state.availableInvoices = state.invoiceList.length;
        },

        updateInvoice:(state, action: PayloadAction<Invoice>) => {
            state.invoiceList = state.invoiceList?.map((invoice) => {
                if (invoice.id === action.payload.id) {
                    return action.payload
                } else {
                    return invoice
                }
            });
            state.availableInvoices = state.invoiceList?.filter((invoice) => {
                return invoice.status == state.FilterBy
            }).length
        },

        deleteInvoice:(state, action: PayloadAction<string>) => {
            state.invoiceList = state.invoiceList?.filter((invoice) => {
                return invoice.id !== action.payload
            });
            state.availableInvoices = state.invoiceList.length
        },

        updateInvoiceToBeDeleted: (state, action: PayloadAction<string>) => {
            state.deleteInvoiceWithId = action.payload
        },

        reset: () => {return initialState}
    })
});

export const { FilterInvoice, reset, addInvoice, deleteInvoice, updateInvoice, loadInvoiceData, updateInvoiceToBeDeleted } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
