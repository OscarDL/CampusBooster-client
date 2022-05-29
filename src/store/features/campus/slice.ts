import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import campusService from '../../../services/campus';
import { Campus, CampusRequest } from '../../../shared/types/campus';


export type CampusState = {
  campusList: Campus[] | null,
};


const initialState: CampusState = {
  campusList: null
};


export const getCampus = createAsyncThunk('campus/getCampus', async (_, thunkAPI) => {
  try {
    return await campusService.getCampus();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getCampusById = createAsyncThunk('campus/getCampusById', async (id: Campus['id'], thunkAPI) => {
  try {
    return await campusService.getCampusById(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createCampus = createAsyncThunk('campus/createCampus', async (campus: CampusRequest, thunkAPI) => {
  try {
    return await campusService.createCampus(campus);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateCampus = createAsyncThunk('campus/updateCampus', async (campus: Campus, thunkAPI) => {
  try {
    return await campusService.updateCampus(campus);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteCampus = createAsyncThunk('campus/deleteCampus', async (id: Campus['id'], thunkAPI) => {
  try {
    await campusService.deleteCampus(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const campusSlice = createSlice({
  name: 'campus',
  initialState,

  reducers: {
    clearCampus: (state: CampusState) => {
      state.campusList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all campus for admins
    builder.addCase(getCampus.fulfilled, (state, {payload}) => {
      state.campusList = payload;
    });

    // Retrieve campus by campus id
    builder.addCase(getCampusById.fulfilled, (state, {payload}) => {
      state.campusList = payload;
    });

    // Create new campus
    builder.addCase(createCampus.fulfilled, (state, {payload}) => {
      state.campusList = (state.campusList ?? []).concat(payload);
    });

    // Update existing campus
    builder.addCase(updateCampus.fulfilled, (state, {payload}) => {
      if (state.campusList) {
        const campusIndex = state.campusList.findIndex(campus => campus.id === payload.id);
        state.campusList[campusIndex] = payload;
      }
    });

    // Delete campus
    builder.addCase(deleteCampus.fulfilled, (state, {payload: id}) => {
      if (state.campusList) {
        state.campusList = state.campusList.filter(campus => campus.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createCampus.rejected, updateCampus.rejected, deleteCampus.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getCampus.rejected, getCampusById.rejected), (state, {payload}: any) => {
        state.campusList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearCampus } = campusSlice.actions;
export default campusSlice.reducer;
