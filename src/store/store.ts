import storageSession from 'redux-persist/lib/storage/session';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';

import { reduxAuthPersistKey } from '../shared/utils/values';

// Global features
import appReducer, { AppState } from './features/app/slice';
import authReducer, { AuthState } from './features/auth/slice';

// Individual features
import toolsReducer, { ToolsState } from './features/tools/slice';
import usersReducer, { UsersState } from './features/users/slice';
import planningReducer, { PlanningState } from './features/planning/slice';
import accountingReducer, { AccountingState } from './features/accounting/slice';


type CombinedReducers = {
  // Global features
  app: AppState,
  auth: AuthState,

  // Individual features
  tools: ToolsState,
  users: UsersState,
  planning: PlanningState,
  accounting: AccountingState
};

const rootReducer = combineReducers({
  // Global features
  app: appReducer,
  auth: authReducer,

  // Individual features
  tools: toolsReducer,
  users: usersReducer,
  planning: planningReducer,
  accounting: accountingReducer
});


const persistConfig: PersistConfig<CombinedState<CombinedReducers>, any, any, any> = {
  key: reduxAuthPersistKey,
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


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
