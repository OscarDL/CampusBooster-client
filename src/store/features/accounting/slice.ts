import dayjs from 'dayjs';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { User } from '../../../shared/types/user';
import { Balance } from '../../../shared/types/accounting';
import accountingService from '../../../services/accounting';


export type AccountingState = {
  balances: Balance[] | null,
};


const initialState: AccountingState = {
  balances: null
};


const setBalanceDates = (balance: Balance) => ({
  ...balance,
  dateRequested: dayjs(balance.dateRequested).format(t('global.date-mm/dd/yyyy')),
  dateConfirmed: dayjs(balance.dateConfirmed).format(t('global.date-mm/dd/yyyy'))
});


export const getBalances = createAsyncThunk('accounting/getBalances', async (_, thunkAPI) => {
  try {
    return await accountingService.getBalances();
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

export const createBalance = createAsyncThunk('balances/createBalance', async (toolData: FormData, thunkAPI) => {
  try {
    return await accountingService.createBalance();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

type UpdateParams = {id: number, toolData: FormData};
export const updateBalance = createAsyncThunk('tools/updateBalance', async ({id, toolData}: UpdateParams, thunkAPI) => {
  try {
    return await accountingService.updateBalance(id);
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

    // Retrieve tools
    builder
      .addMatcher(isAnyOf(getBalances.fulfilled, getUserBalance.fulfilled), (state, {payload}) => {
        const balances = payload.map(setBalanceDates);
        state.balances = balances;
      })
      .addMatcher(isAnyOf(getBalances.rejected, getUserBalance.rejected), (state, {payload}: any) => {
        state.balances = [];
        toast.error(payload.message);
      });

    // Show an error message on any of these cases being rejected.
    builder.addMatcher(
      isAnyOf(createBalance.rejected, updateBalance.rejected, deleteBalance.rejected),
      (_, {payload}: any) => {
        toast.error(payload.message);
      }
    );
  }
});


export const { clearBalances } = accountingSlice.actions;
export default accountingSlice.reducer;
