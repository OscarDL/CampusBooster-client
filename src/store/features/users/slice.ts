import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import userService from '../../../services/users';
import { Classroom } from '../../../shared/types/classroom';
import { User, UserRequest } from '../../../shared/types/user';


export type UsersState = {
  usersList: User[] | null
};


const initialState: UsersState = {
  usersList: null
};


export const getUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
  try {
    return await userService.getUsers();
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
  addClassrooms?: (Classroom['id'])[],
  removeClassrooms?: (Classroom['id'])[]
};
export const updateUser = createAsyncThunk('users/updateUser', async (request: UpdateRequest, thunkAPI) => {
  try {
    // Remove needed classrooms first
    if (request.removeClassrooms && request.removeClassrooms.length > 0) {
      await userService.removeUserFromClassrooms(request.user.id!, request.removeClassrooms);
    }

    // Then update core user info
    const updatedUser = await userService.updateUser(request.user);

    // Then add the necessary classrooms
    if (request.addClassrooms && request.addClassrooms.length > 0) {
      await userService.addUserToClassrooms(request.user.id!, request.addClassrooms);
    }

    // Then return the updated user
    return await userService.getUserById(updatedUser.id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

type UpdateBanRequest = {
  id: User['id'],
  banned: User['banned']
};
export const updateBannedUser = createAsyncThunk('users/updateUser', async ({id, banned}: UpdateBanRequest, thunkAPI) => {
  try {
    return await userService.updateBannedUser(id, banned);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

type DeleteRequest = {user: User, deleteInAD: boolean};
export const deleteUser = createAsyncThunk('users/deleteUser', async ({user, deleteInAD}: DeleteRequest, thunkAPI) => {
  try {
    await userService.deleteUser(user.id, deleteInAD);
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
    clearUsers: (state: UsersState) => {
      state.usersList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all users
    builder
      .addCase(getUsers.fulfilled, (state, {payload}) => {
        state.usersList = payload;
      })
      .addCase(getUsers.rejected, (state, {payload}: any) => {
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


export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
