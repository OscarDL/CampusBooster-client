import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { store } from '../../store';
import { getCampus } from '../campus/slice';
import classroomsService from '../../../services/classrooms';
import { Classroom, ClassroomRequest } from '../../../shared/types/classroom';


export type ClassroomsState = {
  classroomsList: Classroom[] | null,
};


const initialState: ClassroomsState = {
  classroomsList: null
};


export const getClassrooms = createAsyncThunk('classrooms/getClassrooms', async (_, thunkAPI) => {
  try {
    if (!store.getState().campus.campusList) {
      await store.dispatch(getCampus());
    }

    return await classroomsService.getClassrooms();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getClassroomById = createAsyncThunk('classrooms/getClassroomById', async (id: Classroom['id'], thunkAPI) => {
  try {
    return await classroomsService.getClassroomById(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createClassroom = createAsyncThunk('classrooms/createClassroom', async (classroom: ClassroomRequest, thunkAPI) => {
  try {
    return await classroomsService.createClassroom(classroom);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateClassroom = createAsyncThunk('classrooms/updateClassroom', async (classroom: Classroom, thunkAPI) => {
  try {
    return await classroomsService.updateClassroom(classroom);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteClassroom = createAsyncThunk('classrooms/deleteClassroom', async (id: Classroom['id'], thunkAPI) => {
  try {
    await classroomsService.deleteClassroom(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState,

  reducers: {
    clearClassrooms: (state: ClassroomsState) => {
      state.classroomsList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all classrooms for admins
    builder.addCase(getClassrooms.fulfilled, (state, {payload}) => {
      state.classroomsList = payload;
    });

    // Retrieve classroom by classroom id
    builder.addCase(getClassroomById.fulfilled, (state, {payload}) => {
      state.classroomsList = payload;
    });

    // Create new classroom
    builder.addCase(createClassroom.fulfilled, (state, {payload}) => {
      state.classroomsList = (state.classroomsList ?? []).concat(payload);
    });

    // Update existing classroom
    builder.addCase(updateClassroom.fulfilled, (state, {payload}) => {
      if (state.classroomsList) {
        const classroomIndex = state.classroomsList.findIndex(classroom => classroom.id === payload.id);
        state.classroomsList[classroomIndex] = payload;
      }
    });

    // Delete classroom
    builder.addCase(deleteClassroom.fulfilled, (state, {payload: id}) => {
      if (state.classroomsList) {
        state.classroomsList = state.classroomsList.filter(classroom => classroom.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createClassroom.rejected, updateClassroom.rejected, deleteClassroom.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getClassrooms.rejected, getClassroomById.rejected), (state, {payload}: any) => {
        state.classroomsList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearClassrooms } = classroomsSlice.actions;
export default classroomsSlice.reducer;
