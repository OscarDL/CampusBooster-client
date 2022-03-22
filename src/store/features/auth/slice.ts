import { t } from 'i18next';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import authService from '../../../services/auth';
import { AzureData, User } from '../../../shared/types/user';
import { clearAzureLocalStorageData } from '../../../shared/utils';


export type AuthState = {
  user: User | null
};


const initialState: AuthState = {
  user: null
};


export const login = createAsyncThunk('auth/login', async (azureData: AzureData, thunkAPI) => {
  try {
    const response = await authService.login(azureData);
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
    return thunkAPI.rejectWithValue({message, azureData});
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
    // User login process
    builder
      .addCase(login.fulfilled, (state, {payload}) => {
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, {payload}: {payload: any}) => {
        clearAzureLocalStorageData(payload.azureData);

        toast.error(t('login.errors.' + payload.message), {
          onClose: () => {
            // Reset to the initial state
            window.location.pathname = '/login';
          }
        });
      });

    // User logout process
    builder
      .addMatcher(isAnyOf(logout.fulfilled, logout.rejected), () => {
        // Reset to the initial state
        window.location.pathname = '/login';
      });
  }
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;
