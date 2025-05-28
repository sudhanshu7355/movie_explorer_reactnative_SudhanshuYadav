import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './slices/movieSlice';
import userReducer from './slices/userSlices';

export const store = configureStore({
    reducer: {
        movies : movieReducer,
        user : userReducer,
    },
})