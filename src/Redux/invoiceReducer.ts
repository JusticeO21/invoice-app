import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Data, Invoice } from "../types/AppDataType";

type invoiceState = {
    FilterBy: string;
    invoiceList: Data;
    invoiceDataHasAlreadyBeenLoaded: boolean;
    deleteInvoiceWithId?: string;
    availableInvoices: number;
    editInvoice: boolean;
    addNewInvoice: boolean;
}

const initialState: invoiceState = {
    FilterBy: "",
    invoiceList:[],
    invoiceDataHasAlreadyBeenLoaded: false,
    availableInvoices: 0,
    editInvoice:false,
    addNewInvoice:false,
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
            state.invoiceList?.push(action.payload);
            state.availableInvoices = state.invoiceList.length;
        },

        updateInvoice: (state, action: PayloadAction<Invoice>) => {
            const updatedInvoiceList = state.invoiceList?.map((invoice) =>
                invoice.id === action.payload.id ? action.payload : invoice
            );

            state.invoiceList = updatedInvoiceList;
            state.availableInvoices = updatedInvoiceList.length;
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

        editInvoice : (state, action: PayloadAction<boolean>) => {
            state.editInvoice = action.payload
        },

        addNewInvoice : (state, action: PayloadAction<boolean>) => {
            state.addNewInvoice = action.payload;
        },

        reset: () => {return initialState}
    })
});

export const { editInvoice, addNewInvoice, FilterInvoice, reset, addInvoice, deleteInvoice, updateInvoice, loadInvoiceData, updateInvoiceToBeDeleted } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
