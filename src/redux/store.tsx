import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authUser'
import chatReducer from './chat/chatReducer'

export default configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer
    }
})