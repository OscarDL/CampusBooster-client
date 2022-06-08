import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import homeService from '../../../services/home';
import { Summary } from '../../../shared/types/home';


export type HomeState = {
  summary: Summary | null,
};


const initialState: HomeState = {
  summary: null
};


export const getSummary = createAsyncThunk('home/getSummary', async (_, thunkAPI) => {
  try {
    return await homeService.getSummary();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const homeSlice = createSlice({
  name: 'home',
  initialState,

  reducers: {
    clearSummary: (state: HomeState) => {
      state.summary = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve summary for home page
    builder.addCase(getSummary.fulfilled, (state, {payload}) => {
      state.summary = payload;
    });

    // Show an error message if rejected
    builder.addCase(getSummary.rejected, (state, {payload}: any) => {
      state.summary = {campus: 0, courses: 0, students: 0};
      toast.error(payload.message);
    });
  }
});


export const { clearSummary } = homeSlice.actions;
export default homeSlice.reducer;
