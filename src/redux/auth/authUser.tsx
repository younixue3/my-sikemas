import { createSlice } from "@reduxjs/toolkit";

export const authUser = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        login: (state: any, action: any) => {
            state.user = action.payload;
        },
        logout: (state:any ) => {
            state.user = null;
        }
    }
});

// export const { login, logout } = authUser.reducer;

export const selectUser = (state:any) => state.user.user;

export default authUser.reducer;