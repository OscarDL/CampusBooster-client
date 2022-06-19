import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { Course } from '../../../shared/types/course';
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
    return await classroomsService.getClassrooms();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createClassroom = createAsyncThunk('classrooms/createClassroom', async (classroom: ClassroomRequest, thunkAPI) => {
  try {
    const newClassroom = {...classroom, courses: undefined};
    const createdClassroom = await classroomsService.createClassroom(newClassroom);

    if (classroom.courses.length > 0) {
      await classroomsService.addCoursesToClassroom(createdClassroom.id, classroom.courses);
    }

    return await classroomsService.getClassroomById(createdClassroom.id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

type UpdateRequest = {
  classroom: ClassroomRequest,
  addCourses?: (Course['id'])[],
  removeCourses?: (Course['id'])[]
};
export const updateClassroom = createAsyncThunk('classrooms/updateClassroom', async (request: UpdateRequest, thunkAPI) => {
  try {
    if (request.addCourses && request.addCourses.length > 0) {
      await classroomsService.addCoursesToClassroom(request.classroom.id!, request.addCourses);
    }

    if (request.removeCourses && request.removeCourses.length > 0) {
      await classroomsService.removeCoursesFromClassroom(request.classroom.id!, request.removeCourses);
    }

    return await classroomsService.updateClassroom(request.classroom);
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

    // Create new classroom
    builder.addCase(createClassroom.fulfilled, (state, {payload}) => {
      state.classroomsList = (state.classroomsList ?? []).concat(payload);
    });

    // Update existing classroom
    builder.addCase(updateClassroom.fulfilled, (state, {payload}) => {
      if (state.classroomsList) {
        const classroomIndex = state.classroomsList.findIndex(classroom => classroom.id === payload.id);
        if (classroomIndex >= 0) state.classroomsList[classroomIndex] = payload;
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
      .addMatcher(isAnyOf(getClassrooms.rejected), (state, {payload}: any) => {
        state.classroomsList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearClassrooms } = classroomsSlice.actions;
export default classroomsSlice.reducer;
