import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { store } from '../../store';
import { getUsers } from '../users/slice';
import { User } from '../../../shared/types/user';
import accountingService from '../../../services/accounting';
import { Balance, BalanceRequest } from '../../../shared/types/accounting';


export type AccountingState = {
  balances: Balance[] | null,
};


const initialState: AccountingState = {
  balances: null
};


const setBalanceStudent = (balance: Balance): Balance => ({
  ...balance,
  studentName: `${balance.User?.firstName} ${balance.User?.lastName}`
});


export const getBalances = createAsyncThunk('accounting/getBalances', async (_, thunkAPI) => {
  try {
    if (!store.getState().users.usersList) {
      await store.dispatch(getUsers());
    }

    return await accountingService.getBalances();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getUserBalance = createAsyncThunk('accounting/getUserBalance', async (id: User['id'], thunkAPI) => {
  try {
    return await accountingService.getUserBalance(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createBalance = createAsyncThunk('accounting/createBalance', async (balance: BalanceRequest, thunkAPI) => {
  try {
    return await accountingService.createBalance(balance);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateBalance = createAsyncThunk('accounting/updateBalance', async (balance: Balance, thunkAPI) => {
  try {
    return await accountingService.updateBalance(balance);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteBalance = createAsyncThunk('accounting/deleteBalance', async (id: Balance['id'], thunkAPI) => {
  try {
    await accountingService.deleteBalance(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const accountingSlice = createSlice({
  name: 'accounting',
  initialState,

  reducers: {
    clearBalances: (state: AccountingState) => {
      state.balances = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all balance entries for admins
    builder.addCase(getBalances.fulfilled, (state, {payload}) => {
      const balances = payload.map(setBalanceStudent);
      state.balances = balances;
    });

    // Retrieve all balance entries for specific user
    builder.addCase(getUserBalance.fulfilled, (state, {payload}) => {
      const balances = payload.map(setBalanceStudent);
      state.balances = balances;
    });

    // Create new balance entry
    builder.addCase(createBalance.fulfilled, (state, {payload}) => {
      state.balances = (state.balances ?? []).concat(setBalanceStudent(payload));
    });

    // Update existing balance entry
    builder.addCase(updateBalance.fulfilled, (state, {payload}) => {
      if (state.balances) {
        const balanceIndex = state.balances.findIndex(balance => balance.id === payload.id);
        state.balances[balanceIndex] = setBalanceStudent(payload);
      }
    });

    // Delete balance entry
    builder.addCase(deleteBalance.fulfilled, (state, {payload: id}) => {
      if (state.balances) {
        state.balances = state.balances.filter(balance => balance.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createBalance.rejected, updateBalance.rejected, deleteBalance.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getBalances.rejected, getUserBalance.rejected), (state, {payload}: any) => {
        state.balances = [];
        toast.error(payload.message);
      });
  }
});


export const { clearBalances } = accountingSlice.actions;
export default accountingSlice.reducer;
