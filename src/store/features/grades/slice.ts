import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import gradeService from '../../../services/grades';
import { Teacher } from '../../../shared/types/teacher';
import { User, UserRoles } from '../../../shared/types/user';
import { Grade, GradeRequest } from '../../../shared/types/grade';


export type GradesState = {
  gradesList: Grade[] | null,
};


const initialState: GradesState = {
  gradesList: null
};


export const getGrades = createAsyncThunk('grades/getGrades', async (_, thunkAPI) => {
  try {
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

export const getTeacherGrades = createAsyncThunk('grades/getTeacherGrades', async (id: Teacher['id'], thunkAPI) => {
  try {
    return await gradeService.getTeacherGrades(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getTeacherAsUserGrades = createAsyncThunk('grades/getTeacherAsUserGrades', async (id: User['id'], thunkAPI) => {
  try {
    return await gradeService.getTeacherAsUserGrades(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

type CreateGradeRequest = {user: User, grade: GradeRequest};
export const createGrade = createAsyncThunk('grades/createGrade', async ({user, grade}: CreateGradeRequest, thunkAPI) => {
  try {
    const createdGrade = await gradeService.createGrade(grade);
    return {user, grade: createdGrade};
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateGrade = createAsyncThunk('grades/updateGrade', async (grade: Partial<Grade>, thunkAPI) => {
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
  name: 'grades',
  initialState,

  reducers: {
    clearGrades: (state: GradesState) => {
      state.gradesList = null;
    }
  },

  extraReducers: (builder) => {
    // Create new grade
    builder.addCase(createGrade.fulfilled, (state, {payload}) => {
      if (payload.user.role !== UserRoles.Student) { 
        state.gradesList = (state.gradesList ?? []).concat(payload.grade);
      } else {
        if (payload.grade.userId === payload.user.id) {
          state.gradesList = (state.gradesList ?? []).concat(payload.grade);
        }
      }
    });

    // Update existing grade
    builder.addCase(updateGrade.fulfilled, (state, {payload}) => {
      if (state.gradesList) {
        const gradeIndex = state.gradesList.findIndex(grade => grade.id === payload.id);
        if (gradeIndex >= 0) state.gradesList[gradeIndex] = payload;
      }
    });

    // Delete grade
    builder.addCase(deleteGrade.fulfilled, (state, {payload: id}) => {
      if (state.gradesList) {
        state.gradesList = state.gradesList.filter(grade => grade.id !== id);
      }
    });

    // Retrieve specific grades for different user roles
    builder.addMatcher(isAnyOf(
      getGrades.fulfilled,
      getUserGrades.fulfilled,
      getTeacherGrades.fulfilled,
      getTeacherAsUserGrades.fulfilled
    ), (state, {payload}: any) => {
      state.gradesList = payload;
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createGrade.rejected, updateGrade.rejected, deleteGrade.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(
        getGrades.rejected,
        getUserGrades.rejected,
        getTeacherGrades.rejected,
        getTeacherAsUserGrades.rejected
      ), (state, {payload}: any) => {
        state.gradesList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearGrades } = gradesSlice.actions;
export default gradesSlice.reducer;
