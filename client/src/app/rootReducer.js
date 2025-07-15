
import { combineReducers } from "@reduxjs/toolkit";
import { authapi } from "@/feature/api/authapi";
import authReducer from "../feature/authslicer";

const rootReducer = combineReducers({
  [authapi.reducerPath]: authapi.reducer,
  auth: authReducer,
});

export default rootReducer; 
