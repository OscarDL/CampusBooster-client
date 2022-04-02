import { createSlice } from '@reduxjs/toolkit';

import { Settings } from '../../../shared/types/settings';
import { getCategoryTitle, getCurrentTheme } from '../../../shared/functions';


export type AppState = {
  category: string,
  settings: Settings
};


const initialState: AppState = {
  category: getCategoryTitle(),
  settings: {
    darkTheme: getCurrentTheme()
  }
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
