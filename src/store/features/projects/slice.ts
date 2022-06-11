import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { User } from '../../../shared/types/user';
import projectService from '../../../services/projects';
import { Project, ProjectRequest } from '../../../shared/types/project';


export type ProjectsState = {
  projectsList: Project[] | null
};


const initialState: ProjectsState = {
  projectsList: null
};


export const getProjects = createAsyncThunk('project/getProject', async (_, thunkAPI) => {
  try {
    return await projectService.getProjects();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getUserProjects = createAsyncThunk('project/getUserProjects', async (id: User['id'], thunkAPI) => {
  try {
    return await projectService.getUserProjects(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createProject = createAsyncThunk('project/createProject', async (project: ProjectRequest, thunkAPI) => {
  try {
    return await projectService.createProject(project);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const updateProject = createAsyncThunk('project/updateProject', async (project: ProjectRequest, thunkAPI) => {
  try {
    return await projectService.updateProject(project);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteProject = createAsyncThunk('project/deleteProject', async (id: Project['id'], thunkAPI) => {
  try {
    await projectService.deleteProject(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const projectsSlice = createSlice({
  name: 'project',
  initialState,

  reducers: {
    clearProjects: (state: ProjectsState) => {
      state.projectsList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve all projects
    builder.addCase(getProjects.fulfilled, (state, {payload}) => {
      state.projectsList = payload;
    });

    // Retrieve all projects for specific user
    builder.addCase(getUserProjects.fulfilled, (state, {payload}) => {
      state.projectsList = payload;
    });

    // Create new project
    builder.addCase(createProject.fulfilled, (state, {payload}) => {
      state.projectsList = (state.projectsList ?? []).concat(payload);
    });

    // Update existing project
    builder.addCase(updateProject.fulfilled, (state, {payload}) => {
      if (state.projectsList) {
        const projectIndex = state.projectsList.findIndex(project => project.id === payload.id);
        state.projectsList[projectIndex] = payload;
      }
    });

    // Delete project
    builder.addCase(deleteProject.fulfilled, (state, {payload: id}) => {
      if (state.projectsList) {
        state.projectsList = state.projectsList.filter(project => project.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createProject.rejected, updateProject.rejected, deleteProject.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getProjects.rejected, getUserProjects.rejected), (state, {payload}: any) => {
        state.projectsList = [];
        toast.error(payload.message);
      });
  }
});


export const { clearProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
