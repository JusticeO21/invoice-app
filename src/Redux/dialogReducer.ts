import { createSlice } from "@reduxjs/toolkit";

type invoiceState = {
    openDialog:boolean
}

const initialState: invoiceState = {
    openDialog: false
    
}

const DialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: ({
        toggleDialog: (state) => {
            state.openDialog = !state.openDialog
       }
    })
});

export const {toggleDialog} = DialogSlice.actions
export default DialogSlice.reducer;
