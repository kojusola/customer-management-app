import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from './features/quoteSlice';
import userReducer from './features/userSlice';
import onboardingReducer from './features/onboardingSlice'

export default configureStore({
    reducer: {
        quote: quoteReducer,
        user: userReducer,
        onboarding: onboardingReducer
    }
})