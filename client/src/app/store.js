// store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer  from "./rootReducer";
import { authapi } from "../feature/api/authapi";


export const appStore = configureStore({
  reducer:rootReducer,
  middleware:(defaultmiddleware)=>
    defaultmiddleware().concat(authapi.middleware)

});
 const initializeApp = async () => {
  const forceRefetch = true; // or set to false as needed
  await appStore.dispatch(authapi.endpoints.loadUser.initiate({}, { forceRefetch }));
}
initializeApp();