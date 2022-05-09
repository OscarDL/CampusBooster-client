import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import toolsService from '../../../services/tools';
import { ToolLinkBase64Image } from '../../../shared/types/tools';


export type ToolsState = {
  toolsList?: ToolLinkBase64Image[]
};


const initialState: ToolsState = {
  toolsList: undefined
};


export const getTools = createAsyncThunk('tools/getTools', async (_, thunkAPI) => {
  try {
    return await toolsService.getTools();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTool = createAsyncThunk('tools/createTool', async (toolData: FormData, thunkAPI) => {
  try {
    return await toolsService.createTool(toolData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});

type UpdateParams = {id: number, toolData: FormData};
export const updateTool = createAsyncThunk('tools/updateTool', async ({id, toolData}: UpdateParams, thunkAPI) => {
  try {
    return await toolsService.updateTool(id, toolData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});


const toolsSlice = createSlice({
  name: 'tools',
  initialState,

  reducers: {
    clearToolsList: (state) => {
      state.toolsList = undefined;
    }
  },

  extraReducers: (builder) => {
    // Retrieve tools
    builder
      .addCase(getTools.fulfilled, (state, {payload}) => {
        state.toolsList = payload;
      })
      .addCase(getTools.rejected, (state, {payload}: any) => {
        state.toolsList = [];
        toast.error(payload.message);
      });

    // Create new tool
    builder
      .addCase(createTool.fulfilled, (state, {payload}) => {
        state.toolsList = (state.toolsList ?? []).concat(payload);
      })
      .addCase(createTool.rejected, (_, {payload}: any) => {
        toast.error(payload.message);
      });

    // Update existing tool
    builder
      .addCase(updateTool.fulfilled, (state, {payload}) => {
        const toolIndex = state.toolsList?.findIndex(tool => tool.id === payload.id) ?? -1;
        if (state.toolsList && toolIndex >= 0) state.toolsList[toolIndex] = payload;
      })
      .addCase(updateTool.rejected, (_, {payload}: any) => {
        toast.error(payload.message);
      });
  }
});


export const { clearToolsList } = toolsSlice.actions;
export default toolsSlice.reducer;
