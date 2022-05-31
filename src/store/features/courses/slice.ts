import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { User } from '../../../shared/types/user';
import courseService from '../../../services/courses';
import { Course, CourseRequest } from '../../../shared/types/course';


export type CoursesState = {
  coursesList: Course[] | null,
};


const initialState: CoursesState = {
  coursesList: null
};


export const getCourses = createAsyncThunk('courses/getCourses', async (_, thunkAPI) => {
  try {
    return await courseService.getCourses();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getUserCourses = createAsyncThunk('courses/getUserCourses', async (id: User['id'], thunkAPI) => {
  try {
    return await courseService.getUserCourses(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createCourse = createAsyncThunk('courses/createCourse', async (course: CourseRequest, thunkAPI) => {
  try {
    return await courseService.createCourse(course);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async (course: Course, thunkAPI) => {
  try {
    return await courseService.updateCourse(course);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (id: Course['id'], thunkAPI) => {
  try {
    await courseService.deleteCourse(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const coursesSlice = createSlice({
  name: 'courses',
  initialState,

  reducers: {
    clearCourses: (state: CoursesState) => {
      state.coursesList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all courses for admins
    builder.addCase(getCourses.fulfilled, (state, {payload}) => {
      state.coursesList = payload;
    });

    // Retrieve all courses for specific user
    builder.addCase(getUserCourses.fulfilled, (state, {payload}) => {
      state.coursesList = payload;
    });

    // Create new course
    builder.addCase(createCourse.fulfilled, (state, {payload}) => {
      state.coursesList = (state.coursesList ?? []).concat(payload);
    });

    // Update existing course
    builder.addCase(updateCourse.fulfilled, (state, {payload}) => {
      if (state.coursesList) {
        const courseIndex = state.coursesList.findIndex(course => course.id === payload.id);
        state.coursesList[courseIndex] = payload;
      }
    });

    // Delete course
    builder.addCase(deleteCourse.fulfilled, (state, {payload: id}) => {
      if (state.coursesList) {
        state.coursesList = state.coursesList.filter(course => course.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createCourse.rejected, updateCourse.rejected, deleteCourse.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getCourses.rejected, getUserCourses.rejected), (state, {payload}: any) => {
        state.coursesList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
