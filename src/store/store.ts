import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appReducer from './features/app/slice';
import authReducer from './features/auth/slice';


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
});


const persistConfig = {
  key: 'root',
  storage: storageSession
};
// Persist user data between page refreshes
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  // Azure authentication data gives some values of type "Date" which is technically mutable,
  // however, state shouldn't be mutated directly. Only update state with the store reducers!
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export const persistor = persistStore(store);


declare global {
  type RootState = ReturnType<typeof store.getState>;
};

declare module 'react-redux' {
  interface DefaultRootState extends RootState { }
};
