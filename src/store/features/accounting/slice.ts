import dayjs from 'dayjs';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { User } from '../../../shared/types/user';
import userService from '../../../services/users';
import accountingService from '../../../services/accounting';
import { Balance, BalanceRequest } from '../../../shared/types/accounting';


export type AccountingState = {
  users: User[] | null,
  balances: Balance[] | null,
};


const initialState: AccountingState = {
  users: null,
  balances: null
};


const setBalanceDates = (balance: Balance): Balance => ({
  ...balance,
  studentName: `${balance.User?.firstName} ${balance.User?.lastName}`,
  dateRequested: dayjs(balance.dateRequested).format(t('global.date-mm-dd-yyyy')),
  dateConfirmed: balance.dateConfirmed ? dayjs(balance.dateConfirmed).format(t('global.date-mm-dd-yyyy')) : ''
});


export const getBalances = createAsyncThunk('accounting/getBalances', async (_, thunkAPI) => {
  try {
    const users = await userService.getUsers();
    const balances = await accountingService.getBalances();
    return { users, balances };
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserBalance = createAsyncThunk('accounting/getUserBalance', async (id: User['id'], thunkAPI) => {
  try {
    return await accountingService.getUserBalance(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const createBalance = createAsyncThunk('balances/createBalance', async (balance: BalanceRequest, thunkAPI) => {
  try {
    return await accountingService.createBalance(balance);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

type UpdateParams = {id: Balance['id'], balance: Balance};
export const updateBalance = createAsyncThunk('tools/updateBalance', async ({id, balance}: UpdateParams, thunkAPI) => {
  try {
    return await accountingService.updateBalance(balance);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteBalance = createAsyncThunk('tools/deleteBalance', async (id: number, thunkAPI) => {
  try {
    return await accountingService.deleteBalance(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});


const accountingSlice = createSlice({
  name: 'tools',
  initialState,

  reducers: {
    clearBalances: (state: AccountingState) => {
      state.balances = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all balances for admins
    builder.addCase(getBalances.fulfilled, (state, {payload}) => {
      const balances = payload.balances.map(setBalanceDates);
      state.balances = balances;
      state.users = payload.users;
    })

    builder.addCase(getUserBalance.fulfilled, (state, {payload}) => {
      const balances = payload.balances.map(setBalanceDates);
      state.balances = balances;
    })

    // Create new tool
    builder.addCase(createBalance.fulfilled, (state, {payload}) => {
      state.balances = (state.balances ?? []).concat(payload);
    });

    // Update existing tool
    builder.addCase(updateBalance.fulfilled, (state, {payload}) => {
      if (state.balances) {
        const toolIndex = state.balances.findIndex(tool => tool.id === payload.id);
        state.balances[toolIndex] = payload;
      }
    });

    // Update existing tool
    builder.addCase(deleteBalance.fulfilled, (state, {payload: id}) => {
      if (state.balances) {
        state.balances = state.balances.filter(tool => tool.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
    .addMatcher(isAnyOf(createBalance.rejected, updateBalance.rejected, deleteBalance.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getBalances.rejected, getUserBalance.rejected), (state, {payload}: any) => {
        state.users = [];
        state.balances = [];
        toast.error(payload.message);
      });
  }
});


export const { clearBalances } = accountingSlice.actions;
export default accountingSlice.reducer;
