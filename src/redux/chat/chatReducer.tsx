import { createSlice } from "@reduxjs/toolkit";

export const chat = createSlice({
    name: 'chat',
    initialState: {
        data: {}
    },
    reducers: {
        openChat: (state, chat) => {
            state.data = chat
        }
    }
});

// export const { login, logout } = authUser.reducer;

export const { openChat } = chat.actions

export default chat.reducer;