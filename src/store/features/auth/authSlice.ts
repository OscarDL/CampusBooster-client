import { t } from 'i18next';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import authService from './authService';
import { AzureData, User } from '../../../shared/types/user';


export type AuthState = {
  user: User | null,
  loading: boolean,
  isLoggedIn: boolean
};


const initialState: AuthState = {
  user: null,
  loading: false,
  isLoggedIn: false
};


export const login = createAsyncThunk('auth/login', async (azureData: AzureData, thunkAPI) => {
  try {
    const response = await authService.login(azureData.uniqueId);
    if (!response.success) throw response;

    return {
      user: {
        ...response.user,
        azureData
      }
    } as {
      user: User
    };
  }

  catch (error: any) {
    const message = error.response?.data.error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const userData = createAsyncThunk('auth/userData', async (_, thunkAPI) => {
  try {
    const response = await authService.getUserData();
    if (!response.success) throw response;

    return response;
  }

  catch (error: any) {
    const message = error.response?.data.error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await authService.logout();
    if (!response.success) throw response;

    return response;
  }

  catch (error: any) {
    const message = error.response?.data.error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
    }
  },

  extraReducers: (builder) => {
    builder // User login process
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.loading = false;
        state.user = {} as User;
        state.isLoggedIn = false;
        toast.error(t('login.errors.' + payload));
      });


    builder // User data retrieval process
      .addCase(userData.pending, (state) => {
        state.loading = true;
      })
      .addCase(userData.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(userData.rejected, (state) => {
        state.loading = false;
        state.user = {} as User;
        state.isLoggedIn = false;
        toast.error(t('login.errors.data'));
      });


    builder // User logout process
      .addMatcher(isAnyOf(logout.fulfilled, logout.rejected), (state) => {
        state.user = {} as User;
        state.isLoggedIn = false;

        // Reset to the initial state
        localStorage.removeItem('isLoggedIn');
        window.location.pathname = '/login';
      });
  }
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;
