import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAuthenticated:false,
}

 const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedin:(state,Action)=>{
        state.user=Action.payload.user;
        state.isAuthenticated=true;
        },
        userLogedout:(state)=>{
         state.user=null;
         state.isAuthenticated=false
        }
    }

});

export const {userLoggedin,userLogedout} = authSlice.actions;
export default authSlice.reducer;