import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import teacherService from '../../../services/teachers';
import { Teacher, TeacherRequest } from '../../../shared/types/teacher';


export type TeachersState = {
  teachersList: Teacher[] | null
};


const initialState: TeachersState = {
  teachersList: null
};


export const getTeachers = createAsyncThunk('teachers/getTeachers', async (_, thunkAPI) => {
  try {
    return await teacherService.getTeachers();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createTeacher = createAsyncThunk('teachers/createTeacher', async (teacher: TeacherRequest, thunkAPI) => {
  try {
    return await teacherService.createTeacher(teacher);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateTeacher = createAsyncThunk('teachers/updateTeacher', async (teacher: TeacherRequest, thunkAPI) => {
  try {
    return await teacherService.updateTeacher(teacher);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher', async (id: Teacher['id'], thunkAPI) => {
  try {
    await teacherService.deleteTeacher(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const teachersSlice = createSlice({
  name: 'teachers',
  initialState,

  reducers: {
    clearTeachers: (state: TeachersState) => {
      state.teachersList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve teachers
    builder
      .addCase(getTeachers.fulfilled, (state, {payload}) => {
        state.teachersList = payload;
      })
      .addCase(getTeachers.rejected, (state, {payload}: any) => {
        state.teachersList = [];
        toast.error(payload.message);
      });

    // Create new teacher
    builder.addCase(createTeacher.fulfilled, (state, {payload}) => {
      state.teachersList = (state.teachersList ?? []).concat(payload);
    });

    // Update existing teacher
    builder.addCase(updateTeacher.fulfilled, (state, {payload}) => {
      if (state.teachersList) {
        const teacherIndex = state.teachersList.findIndex(teacher => teacher.id === payload.id);
        state.teachersList[teacherIndex] = payload;
      }
    });

    // Delete teacher
    builder.addCase(deleteTeacher.fulfilled, (state, {payload: id}) => {
      if (state.teachersList) {
        state.teachersList = state.teachersList.filter(teacher => teacher.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder.addMatcher(
      isAnyOf(createTeacher.rejected, updateTeacher.rejected, deleteTeacher.rejected),
      (_, {payload}: any) => {
        toast.error(payload.message);
      }
    );
  }
});


export const { clearTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
