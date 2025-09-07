import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import FilterReducer from "./invoiceReducer";
import DialogReducer from "./dialogReducer";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  invoice: FilterReducer,
  dialog: DialogReducer,
  auth: authReducer,
});

export default rootReducer;
