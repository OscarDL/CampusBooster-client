import { configureStore } from '@reduxjs/toolkit';

import appReducer from './features/app/slice';
import authReducer from './features/auth/slice';
import settingsReducer from './features/settings/slice';


export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    settings: settingsReducer
  },
  // Azure authentication data gives some values of type Date which is technically mutable
  // but state shouldn't be mutated with Redux. Only update state with the store reducers!
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
};

declare module 'react-redux' {
  interface DefaultRootState extends RootState { }
};
