import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { store } from '../../store';
import { getUsers } from '../users/slice';
import { User } from '../../../shared/types/user';
import gradeService from '../../../services/grades';
import { Grade, GradeRequest } from '../../../shared/types/grades';


export type GradesState = {
  gradesList: Grade[] | null,
};


const initialState: GradesState = {
  gradesList: null
};


export const getGrades = createAsyncThunk('grades/getGrades', async (_, thunkAPI) => {
  try {
    if (!store.getState().users.usersList) {
      await store.dispatch(getUsers());
    }

    return await gradeService.getGrades();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getUserGrades = createAsyncThunk('grades/getUserGrades', async (id: User['id'], thunkAPI) => {
  try {
    return await gradeService.getUserGrades(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createGrade = createAsyncThunk('grades/createGrade', async (grade: GradeRequest, thunkAPI) => {
  try {
    return await gradeService.createGrade(grade);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateGrade = createAsyncThunk('grades/updateGrade', async (grade: Grade, thunkAPI) => {
  try {
    return await gradeService.updateGrade(grade);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteGrade = createAsyncThunk('grades/deleteGrade', async (id: Grade['id'], thunkAPI) => {
  try {
    await gradeService.deleteGrade(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const gradesSlice = createSlice({
  name: 'grade',
  initialState,

  reducers: {
    clearGrades: (state: GradesState) => {
      state.gradesList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all grades for admins
    builder.addCase(getGrades.fulfilled, (state, {payload}) => {
      state.gradesList = payload;
    });

    // Retrieve all grades for specific user
    builder.addCase(getUserGrades.fulfilled, (state, {payload}) => {
      state.gradesList = payload;
    });

    // Create new grade
    builder.addCase(createGrade.fulfilled, (state, {payload}) => {
      state.gradesList = (state.gradesList ?? []).concat(payload);
    });

    // Update existing grade
    builder.addCase(updateGrade.fulfilled, (state, {payload}) => {
      if (state.gradesList) {
        const gradeIndex = state.gradesList.findIndex(grade => grade.id === payload.id);
        state.gradesList[gradeIndex] = payload;
      }
    });

    // Delete grade
    builder.addCase(deleteGrade.fulfilled, (state, {payload: id}) => {
      if (state.gradesList) {
        state.gradesList = state.gradesList.filter(grade => grade.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
    .addMatcher(isAnyOf(createGrade.rejected, updateGrade.rejected, deleteGrade.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getGrades.rejected, getUserGrades.rejected), (state, {payload}: any) => {
        state.gradesList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearGrades } = gradesSlice.actions;
export default gradesSlice.reducer;
