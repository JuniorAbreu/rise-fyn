import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";
import userReducer from "./slices/userSlice";
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
