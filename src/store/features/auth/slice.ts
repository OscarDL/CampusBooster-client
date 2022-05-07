import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { values } from '../../../shared/utils';
import authService from '../../../services/auth';
import { AzureData, User } from '../../../shared/types/user';
import { clearAzureLocalStorageData } from '../../../shared/functions';
import { AccountInfo } from '@azure/msal-browser';


export type AuthState = {
  user: User | null,
  refreshToken: string
};


const initialState: AuthState = {
  user: null,
  refreshToken: ''
};


export const login = createAsyncThunk('auth/login', async (azureData: AzureData, thunkAPI) => {
  try {
    const response = await authService.login(azureData);

    return {
      ...response,
      user: {
        ...response.user,
        azureData
      }
    } as AuthState;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue({message, azureData});
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});


export const clearLoginState = (azureData: AccountInfo) => {
  clearAzureLocalStorageData(azureData);
  sessionStorage.removeItem('persist:' + values.authPersistKey);

  window.location.pathname = '/login';
};


const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
    },

    setRefreshToken: (state, {payload}) => {
      state.refreshToken = payload;
    },

    forceLogout: (state) => {
      clearLoginState(state.user!.azureData);
    }
  },

  extraReducers: (builder) => {
    // User login process
    builder
      .addCase(login.fulfilled, (state, {payload}) => {
        state.user = payload.user;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(login.rejected, (_, {payload}: {payload: any}) => {
        toast.error(payload.message, {
          onClose: () => {
            // Clear persisted auth state before login
            clearLoginState(payload.azureData);
          }
        });
      });

    // User logout process
    builder
      .addMatcher(isAnyOf(logout.fulfilled, logout.rejected), (state) => {
        // Clear persisted auth state before login
        clearLoginState(state.user!.azureData);
      });
  }
});


export const { setUser, setRefreshToken, forceLogout } = authSlice.actions;
export default authSlice.reducer;
