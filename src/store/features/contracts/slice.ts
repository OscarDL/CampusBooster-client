import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { User } from '../../../shared/types/user';
import { Contract } from '../../../shared/types/contract';
import contractService from '../../../services/contracts';


export type ContractsState = {
  contractsList: Contract[] | null
};


const initialState: ContractsState = {
  contractsList: null
};


export const getContracts = createAsyncThunk('contracts/getContracts', async (_, thunkAPI) => {
  try {
    return await contractService.getContracts();
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getUserContracts = createAsyncThunk('contracts/getUserContracts', async (id: User['id'], thunkAPI) => {
  try {
    return await contractService.getUserContracts(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const getSupervisorContracts = createAsyncThunk('contracts/getSupervisorContracts', async (id: User['id'], thunkAPI) => {
  try {
    return await contractService.getSupervisorContracts(id);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const createContract = createAsyncThunk('contracts/createContract', async (contractData: FormData, thunkAPI) => {
  try {
    return await contractService.createContract(contractData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

type UpdateRequest = {
  id: Contract['id'],
  contractData: FormData
};
export const updateContract = createAsyncThunk('contracts/updateContract', async ({id, contractData}: UpdateRequest, thunkAPI) => {
  try {
    return await contractService.updateContract(id, contractData);
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});

export const deleteContract = createAsyncThunk('contracts/deleteContract', async (id: Contract['id'], thunkAPI) => {
  try {
    await contractService.deleteContract(id);
    return id;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  };
});


const contractsSlice = createSlice({
  name: 'contracts',
  initialState,

  reducers: {
    clearContracts: (state: ContractsState) => {
      state.contractsList = null;
    }
  },

  extraReducers: (builder) => {
    // Retrieve contracts
    builder.addCase(getContracts.fulfilled, (state, {payload}) => {
      state.contractsList = payload;
    });

    // Retrieve contracts for specific user
    builder.addCase(getUserContracts.fulfilled, (state, {payload}) => {
      state.contractsList = payload;
    });

    // Create new contract
    builder.addCase(createContract.fulfilled, (state, {payload}) => {
      state.contractsList = (state.contractsList ?? []).concat(payload);
    });

    // Update existing contract
    builder.addCase(updateContract.fulfilled, (state, {payload}) => {
      if (state.contractsList) {
        const contractIndex = state.contractsList.findIndex(contract => contract.id === payload.id);
        if (contractIndex >= 0) state.contractsList[contractIndex] = payload;
      }
    });

    // Delete contract
    builder.addCase(deleteContract.fulfilled, (state, {payload: id}) => {
      if (state.contractsList) {
        state.contractsList = state.contractsList.filter(contract => contract.id !== id);
      }
    });

    // Show an error message on any of these cases being rejected.
    builder
      .addMatcher(isAnyOf(createContract.rejected, updateContract.rejected, deleteContract.rejected), (_, {payload}: any) => {
        toast.error(payload.message);
      })
      .addMatcher(isAnyOf(getContracts.rejected, getUserContracts.rejected), (state, {payload}: any) => {
        state.contractsList = [];
        toast.error(payload.message);
      });;
  }
});


export const { clearContracts } = contractsSlice.actions;
export default contractsSlice.reducer;
