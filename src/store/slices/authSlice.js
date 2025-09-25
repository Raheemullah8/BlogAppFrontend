import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:null,
    isAuthenticated:false
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        Logout:(state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        registerSuccess:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        updateUser:(state, action)=>{
            state.user = action.payload;
        }

    }
});

export const {loginSuccess,Logout,registerSuccess,updateUser} = authSlice.actions;
export default authSlice.reducer;
