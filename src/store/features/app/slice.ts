import { createSlice } from '@reduxjs/toolkit';

import { getCategoryTitle } from '../../../shared/utils';


export type AppState = {
  category: string
};


const initialState: AppState = {
  category: getCategoryTitle()
};


const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setCategory: (state, {payload}) => {
      state.category = payload;
    }
  }
});


export const { setCategory } = appSlice.actions;
export default appSlice.reducer;
