import { createSlice } from '@reduxjs/toolkit';

import { Settings } from '../../../shared/types/settings';
import { getCategoryTitle, getCurrentLang, getCurrentTheme } from '../../../shared/functions';


export type AppState = {
  category: string,
  settings: Settings
};


const initialState: AppState = {
  category: getCategoryTitle(),
  settings: {
    lang: getCurrentLang(),
    darkTheme: getCurrentTheme()
  }
};


const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setCategory: (state, {payload}) => {
      state.category = payload;
    },
    setNewLang: (state, {payload}) => {
      state.settings.lang = payload;
    }
  }
});


export const { setCategory, setNewLang } = appSlice.actions;
export default appSlice.reducer;
