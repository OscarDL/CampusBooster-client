import { createSlice } from '@reduxjs/toolkit';

import { Settings, SupportedLangs, SupportedThemes } from '../../../shared/types/settings';
import { getCategoryTitle, getCurrentLang, getCurrentTheme } from '../../../shared/functions';


export type AppState = {
  category: string,
  settings: Settings
};


const initialState: AppState = {
  category: getCategoryTitle(),
  settings: {
    lang: getCurrentLang(),
    darkTheme: getCurrentTheme() === 'dark'
  }
};


const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setCategory: (state, {payload}: {payload: string}) => {
      state.category = payload;
    },
    setNewLang: (state, {payload}: {payload: SupportedLangs}) => {
      state.settings.lang = payload;
    },
    setNewTheme: (state, {payload}: {payload: SupportedThemes}) => {
      state.settings.darkTheme = getCurrentTheme(payload) === 'dark';
    }
  }
});


export const { setCategory, setNewLang, setNewTheme } = appSlice.actions;
export default appSlice.reducer;
