import { combineReducers } from "@reduxjs/toolkit";
import { dataApi } from "./dataApi";
import FilterReducer from "./invoiceReducer";
import DialogReducer from "./dialogReducer"

const rootReducer = combineReducers({
    [dataApi.reducerPath]: dataApi.reducer,
    "invoice": FilterReducer,
    "dialog":DialogReducer
})

export default rootReducer
