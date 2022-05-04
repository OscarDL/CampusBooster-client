import storageSession from 'redux-persist/lib/storage/session';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';

import { values } from '../shared/utils';
import appReducer, { AppState } from './features/app/slice';
import authReducer, { AuthState } from './features/auth/slice';


type CombinedReducers = {
  app: AppState,
  auth: AuthState
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
});


const persistConfig: PersistConfig<CombinedState<CombinedReducers>, any, any, any> = {
  key: values.authPersistKey,
  storage: storageSession,
  whitelist: ['auth']
};
// Persist user auth state + data between page refreshes
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
