import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { User } from '../../../shared/types/user';
import planningService from '../../../services/planning';
import { Planning, PlanningRequest } from '../../../shared/types/planning';


export type PlanningsState = {
  planningsList: Planning[] | null,
};


const initialState: PlanningsState = {
  planningsList: null
};


export const getPlannings = createAsyncThunk('planning/getPlanning', async (_, thunkAPI) => {
  try {
    return await planningService.getPlannings();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getUserPlanning = createAsyncThunk('planning/getUserPlanning', async (id: User['id'], thunkAPI) => {
  try {
    return await planningService.getUserPlanning(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createPlanningEntry = createAsyncThunk('planning/createPlanningEntry', async (planning: PlanningRequest, thunkAPI) => {
  try {
    return await planningService.createPlanningEntry(planning);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updatePlanningEntry = createAsyncThunk('planning/updatePlanningEntry', async (planning: Planning, thunkAPI) => {
  try {
    return await planningService.updatePlanningEntry(planning);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deletePlanningEntry = createAsyncThunk('planning/deletePlanningEntry', async (id: Planning['id'], thunkAPI) => {
  try {
    await planningService.deletePlanningEntry(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const planningsSlice = createSlice({
  name: 'planning',
  initialState,

  reducers: {
    clearPlannings: (state: PlanningsState) => {
      state.planningsList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all planning entries for admins
    builder.addCase(getPlannings.fulfilled, (state, {payload}) => {
      state.planningsList = payload;
    });

    // Retrieve all planning entries for specific user
    builder.addCase(getUserPlanning.fulfilled, (state, {payload}) => {
      state.planningsList = payload;
    });

    // Create new planning entry
    builder.addCase(createPlanningEntry.fulfilled, (state, {payload}) => {
      state.planningsList = (state.planningsList ?? []).concat(payload);
    });

    // Update existing planning entry
    builder.addCase(updatePlanningEntry.fulfilled, (state, {payload}) => {
      if (state.planningsList) {
        const planningIndex = state.planningsList.findIndex(entry => entry.id === payload.id);
        state.planningsList[planningIndex] = payload;
      }
    });

    // Delete planning entry
    builder.addCase(deletePlanningEntry.fulfilled, (state, {payload: id}) => {
      if (state.planningsList) {
        state.planningsList = state.planningsList.filter(entry => entry.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createPlanningEntry.rejected, updatePlanningEntry.rejected, deletePlanningEntry.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getPlannings.rejected, getUserPlanning.rejected), (state, {payload}: any) => {
        state.planningsList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearPlannings } = planningsSlice.actions;
export default planningsSlice.reducer;
