import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from './features/quoteSlice';
import userReducer from './features/userSlice';

export default configureStore({
    reducer: {
        quote: quoteReducer,
        user: userReducer
    }
})