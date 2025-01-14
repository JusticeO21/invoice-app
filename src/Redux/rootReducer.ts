import { combineReducers } from "@reduxjs/toolkit";
import { dataApi } from "./dataApi";
import { authApi } from "./authApi";
import FilterReducer from "./invoiceReducer";
import DialogReducer from "./dialogReducer"

const rootReducer = combineReducers({
    [dataApi.reducerPath]: dataApi.reducer,
     [authApi.reducerPath]: authApi.reducer,
    "invoice": FilterReducer,
    "dialog":DialogReducer
})

export default rootReducer
