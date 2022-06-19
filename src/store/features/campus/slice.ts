import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import campusService from '../../../services/campus';
import { PublicUser } from '../../../shared/types/user';
import { Campus, CampusRequest } from '../../../shared/types/campus';


export type CampusState = {
  campusList: Campus[] | null,
};

type UpdateCampusManager = {
  campusId: Campus['id'],
  campusManager?: PublicUser,
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
    },

    updateCampusManager: (state: CampusState, {payload}: {payload: UpdateCampusManager}) => {
      if (state.campusList) {
        const campusIndex = state.campusList.findIndex(campus => campus.id === payload.campusId);
        if (campusIndex >= 0) state.campusList[campusIndex].CampusManager = payload.campusManager;
      }
    }
  },

  extraReducers: (builder) => {
    // Retrieve all campus for admins
    builder.addCase(getCampus.fulfilled, (state, {payload}) => {
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
        if (campusIndex >= 0) state.campusList[campusIndex] = payload;
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
      .addMatcher(isAnyOf(getCampus.rejected), (state, {payload}: any) => {
        state.campusList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearCampus, updateCampusManager } = campusSlice.actions;
export default campusSlice.reducer;
