import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { Campus } from '../../../shared/types/campus';
import { Classroom } from '../../../shared/types/classroom';
import { User, UserRequest } from '../../../shared/types/user';

import userService from '../../../services/users';
import campusService from '../../../services/campus';
import classroomService from '../../../services/classrooms';


export type UsersState = {
  usersList: User[] | null
  campusList: Campus[] | null,
  classroomsList: Classroom[] | null,
};


const initialState: UsersState = {
  usersList: null,
  campusList: null,
  classroomsList: null
};


export const getUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
  try {
    const users = await userService.getUsers();
    const campus = await campusService.getCampus();
    const classrooms = await classroomService.getClassrooms();
    return { users, campus, classrooms };
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const createUser = createAsyncThunk('users/createUser', async (user: UserRequest, thunkAPI) => {
  try {
    const { isNew, user: createdUser } = await userService.createUser(user);

    if (user.classrooms.length > 0) {
      const newUser = await userService.addUserToClassrooms(createdUser.id, user.classrooms);
      return { user: newUser, isNew };
    }

    return { user: createdUser, isNew };
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

type UpdateRequest = {
  user: UserRequest,
  addClassrooms: (Classroom['id'])[],
  removeClassrooms: (Classroom['id'])[]
};
export const updateUser = createAsyncThunk('users/updateUser', async (request: UpdateRequest, thunkAPI) => {
  try {
    let response = await userService.updateUser(request.user);

    if (request.addClassrooms.length > 0) {
      response = await userService.addUserToClassrooms(request.user.id!, request.addClassrooms);
    }

    if (request.removeClassrooms.length > 0) {
      response = await userService.removeUserFromClassrooms(request.user.id!, request.removeClassrooms);
    }

    return response;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (user: User, thunkAPI) => {
  try {
    await userService.deleteUser(user.id);

    const classrooms = (user.UserHasClassrooms ?? []).map(classroom => classroom.classroomId);
    if (classrooms.length > 0) await userService.removeUserFromClassrooms(user.id, classrooms);

    return user.id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});


const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    clearUsersList: (state: UsersState) => {
      state.campusList = null;
      state.usersList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all users
    builder
      .addCase(getUsers.fulfilled, (state, {payload}) => {
        state.usersList = payload.users;
        state.campusList = payload.campus;
        state.classroomsList = payload.classrooms;
      })
      .addCase(getUsers.rejected, (state, {payload}: any) => {
        state.campusList = [];
        state.usersList = [];
        toast.error(payload.message);
      });

    // Create new user
    builder.addCase(createUser.fulfilled, (state, {payload}) => {
      state.usersList = (state.usersList ?? []).concat(payload.user);
    });

    // Update existing user
    builder.addCase(updateUser.fulfilled, (state, {payload}) => {
      if (state.usersList) {
        const userIndex = state.usersList.findIndex(user => user.id === payload.id);
        state.usersList[userIndex] = payload;
      }
    });

    // Delete user
    builder.addCase(deleteUser.fulfilled, (state, {payload: id}) => {
      if (state.usersList) {
        state.usersList = state.usersList.filter(user => user.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder.addMatcher(isAnyOf(createUser.rejected, updateUser.rejected, deleteUser.rejected), (_, {payload}: any) => {
      toast.error(payload.message);
    });
  }
});


export const { clearUsersList } = usersSlice.actions;
export default usersSlice.reducer;
