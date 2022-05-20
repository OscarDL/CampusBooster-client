import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import toolsService from '../../../services/tools';
import { ToolLink, ToolLinkBase64Image } from '../../../shared/types/tools';


export type ToolsState = {
  toolsList: ToolLinkBase64Image[] | null
};


const initialState: ToolsState = {
  toolsList: null
};


export const getTools = createAsyncThunk('tools/getTools', async (_, thunkAPI) => {
  try {
    return await toolsService.getTools();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createTool = createAsyncThunk('tools/createTool', async (toolData: FormData, thunkAPI) => {
  try {
    return await toolsService.createTool(toolData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

type UpdateRequest = {
  id: ToolLink['id'],
  toolData: FormData
};
export const updateTool = createAsyncThunk('tools/updateTool', async ({id, toolData}: UpdateRequest, thunkAPI) => {
  try {
    return await toolsService.updateTool(id, toolData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteTool = createAsyncThunk('tools/deleteTool', async (id: ToolLink['id'], thunkAPI) => {
  try {
    await toolsService.deleteTool(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const toolsSlice = createSlice({
  name: 'tools',
  initialState,

  reducers: {
    clearToolsList: (state: ToolsState) => {
      state.toolsList = null;
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
    builder.addCase(createTool.fulfilled, (state, {payload}) => {
      state.toolsList = (state.toolsList ?? []).concat(payload);
    });

    // Update existing tool
    builder.addCase(updateTool.fulfilled, (state, {payload}) => {
      if (state.toolsList) {
        const toolIndex = state.toolsList.findIndex(tool => tool.id === payload.id);
        state.toolsList[toolIndex] = payload;
      }
    });

    // Delete tool
    builder.addCase(deleteTool.fulfilled, (state, {payload: id}) => {
      if (state.toolsList) {
        state.toolsList = state.toolsList.filter(tool => tool.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder.addMatcher(
      isAnyOf(createTool.rejected, updateTool.rejected, deleteTool.rejected),
      (_, {payload}: any) => {
        toast.error(payload.message);
      }
    );
  }
});


export const { clearToolsList } = toolsSlice.actions;
export default toolsSlice.reducer;
