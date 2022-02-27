import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import settingsReducer from './features/settings/settingsSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer
  }
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
};

declare module 'react-redux' {
  interface DefaultRootState extends RootState { }
};
