import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { store } from '../../store';
import { getUsers } from '../users/slice';
import { User } from '../../../shared/types/user';
import planningService from '../../../services/planning';
import { Planning, PlanningRequest } from '../../../shared/types/planning';


export type PlanningState = {
  planning: Planning[] | null,
};


const initialState: PlanningState = {
  planning: null
};


export const getPlanning = createAsyncThunk('planning/getPlanning', async (_, thunkAPI) => {
  try {
    if (!store.getState().users.usersList) {
      await store.dispatch(getUsers());
    }

    return await planningService.getPlanning();
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

export const deletePlanningEntry = createAsyncThunk('planning/deletePlanningEntry', async (id: number, thunkAPI) => {
  try {
    await planningService.deletePlanningEntry(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const planningSlice = createSlice({
  name: 'planning',
  initialState,

  reducers: {
    clearPlanning: (state: PlanningState) => {
      state.planning = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all balance entries for admins
    builder.addCase(getPlanning.fulfilled, (state, {payload}) => {
      state.planning = payload;
    });

    // Retrieve all balance entries for specific user
    builder.addCase(getUserPlanning.fulfilled, (state, {payload}) => {
      state.planning = payload;
    });

    // Create new balance entry
    builder.addCase(createPlanningEntry.fulfilled, (state, {payload}) => {
      state.planning = (state.planning ?? []).concat(payload);
    });

    // Update existing balance entry
    builder.addCase(updatePlanningEntry.fulfilled, (state, {payload}) => {
      if (state.planning) {
        const planningIndex = state.planning.findIndex(entry => entry.id === payload.id);
        state.planning[planningIndex] = payload;
      }
    });

    // Delete balance entry
    builder.addCase(deletePlanningEntry.fulfilled, (state, {payload: id}) => {
      if (state.planning) {
        state.planning = state.planning.filter(entry => entry.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
    .addMatcher(isAnyOf(createPlanningEntry.rejected, updatePlanningEntry.rejected, deletePlanningEntry.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getPlanning.rejected, getUserPlanning.rejected), (state, {payload}: any) => {
        state.planning = [];
        toast.error(payload.message);
      });
  }
});


export const { clearPlanning } = planningSlice.actions;
export default planningSlice.reducer;
