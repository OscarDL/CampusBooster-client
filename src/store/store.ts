import storageSession from 'redux-persist/lib/storage/session';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';

import { reduxAuthPersistKey } from '../shared/utils/values';

// Global features
import appReducer, { AppState } from './features/app/slice';
import authReducer, { AuthState } from './features/auth/slice';

// Individual features
import homeReducer, { HomeState } from './features/home/slice';
import toolsReducer, { ToolsState } from './features/tools/slice';
import usersReducer, { UsersState } from './features/users/slice';
import campusReducer, { CampusState } from './features/campus/slice';
import gradesReducer, { GradesState } from './features/grades/slice';
import coursesReducer, { CoursesState } from './features/courses/slice';
import absencesReducer, { AbsencesState } from './features/absences/slice';
import projectsReducer, { ProjectsState } from './features/projects/slice';
import teachersReducer, { TeachersState } from './features/teachers/slice';
import contractsReducer, { ContractsState } from './features/contracts/slice';
import planningsReducer, { PlanningsState } from './features/plannings/slice';
import accountingReducer, { AccountingState } from './features/accounting/slice';
import classroomsReducer, { ClassroomsState } from './features/classrooms/slice';


type CombinedReducers = {
  // Global features
  app: AppState,
  auth: AuthState,

  // Individual features
  home: HomeState,
  tools: ToolsState,
  users: UsersState,
  grades: GradesState,
  campus: CampusState,
  courses: CoursesState,
  absences: AbsencesState,
  projects: ProjectsState,
  teachers: TeachersState,
  contracts: ContractsState,
  plannings: PlanningsState,
  accounting: AccountingState,
  classrooms: ClassroomsState
};

const rootReducer = combineReducers({
  // Global features
  app: appReducer,
  auth: authReducer,

  // Individual features
  home: homeReducer,
  tools: toolsReducer,
  users: usersReducer,
  campus: campusReducer,
  grades: gradesReducer,
  courses: coursesReducer,
  absences: absencesReducer,
  projects: projectsReducer,
  teachers: teachersReducer,
  contracts: contractsReducer,
  plannings: planningsReducer,
  accounting: accountingReducer,
  classrooms: classroomsReducer
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
