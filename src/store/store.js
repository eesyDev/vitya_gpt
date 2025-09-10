import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import chatApi from './api/chatApi';
// import authReducer from './slices/authSlice'; // Если auth на Redux

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    // auth: authReducer, // когда auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});