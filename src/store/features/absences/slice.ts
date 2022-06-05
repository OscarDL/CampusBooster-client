import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import absenceService from '../../../services/absences';
import { Absence } from '../../../shared/types/absence';
import { User } from '../../../shared/types/user';


export type AbsencesState = {
  absencesList: Absence[] | null
};


const initialState: AbsencesState = {
  absencesList: null
};


export const getAbsences = createAsyncThunk('absences/getAbsences', async (_, thunkAPI) => {
  try {
    return await absenceService.getAbsences();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getUserAbsences = createAsyncThunk('absences/getAbsences', async (id: User['id'], thunkAPI) => {
  try {
    return await absenceService.getUserAbsences(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createAbsence = createAsyncThunk('absences/createAbsence', async (absenceData: FormData, thunkAPI) => {
  try {
    return await absenceService.createAbsence(absenceData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

type UpdateRequest = {
  id: Absence['id'],
  absenceData: FormData
};
export const updateAbsence = createAsyncThunk('absences/updateAbsence', async ({id, absenceData}: UpdateRequest, thunkAPI) => {
  try {
    return await absenceService.updateAbsence(id, absenceData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteAbsence = createAsyncThunk('absences/deleteAbsence', async (id: Absence['id'], thunkAPI) => {
  try {
    await absenceService.deleteAbsence(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const absencesSlice = createSlice({
  name: 'absences',
  initialState,

  reducers: {
    clearAbsences: (state: AbsencesState) => {
      state.absencesList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve absences
    builder
      .addCase(getAbsences.fulfilled, (state, {payload}) => {
        state.absencesList = payload;
      })
      .addCase(getAbsences.rejected, (state, {payload}: any) => {
        state.absencesList = [];
        toast.error(payload.message);
      });

    // Create new absence
    builder.addCase(createAbsence.fulfilled, (state, {payload}) => {
      state.absencesList = (state.absencesList ?? []).concat(payload);
    });

    // Update existing absence
    builder.addCase(updateAbsence.fulfilled, (state, {payload}) => {
      if (state.absencesList) {
        const absenceIndex = state.absencesList.findIndex(absence => absence.id === payload.id);
        state.absencesList[absenceIndex] = payload;
      }
    });

    // Delete absence
    builder.addCase(deleteAbsence.fulfilled, (state, {payload: id}) => {
      if (state.absencesList) {
        state.absencesList = state.absencesList.filter(absence => absence.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder.addMatcher(
      isAnyOf(createAbsence.rejected, updateAbsence.rejected, deleteAbsence.rejected),
      (_, {payload}: any) => {
        toast.error(payload.message);
      }
    );
  }
});


export const { clearAbsences } = absencesSlice.actions;
export default absencesSlice.reducer;
