import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import usersService from '../../../services/users';
import campusService from '../../../services/campus';
import { Campus } from '../../../shared/types/campus';
import { User, UserRequest } from '../../../shared/types/user';


export type UsersState = {
  usersList: User[] | null
  campusList: Campus[] | null,
};


const initialState: UsersState = {
  usersList: null,
  campusList: null
};


export const getUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
  try {
    const campus = await campusService.getCampus();
    const users = await usersService.getUsers();
    return { campus, users };
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const createUser = createAsyncThunk('users/createUser', async (user: UserRequest, thunkAPI) => {
  try {
    return await usersService.createUser(user);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User, thunkAPI) => {
  try {
    return await usersService.updateUser(user);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number, thunkAPI) => {
  try {
    await usersService.deleteUser(id);
    return id;
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
        state.campusList = payload.campus;
        state.usersList = payload.users;
      })
      .addCase(getUsers.rejected, (state, {payload}: any) => {
        state.campusList = [];
        state.usersList = [];
        toast.error(payload.message);
      });

    // Create new user
    builder.addCase(createUser.fulfilled, (state, {payload}) => {
      state.usersList = (state.usersList ?? []).concat(payload);
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
