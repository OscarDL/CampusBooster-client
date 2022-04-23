import { createSlice } from '@reduxjs/toolkit';

import { LinkTypes, Settings, SupportedLangs, SupportedThemes } from '../../../shared/types/settings';
import { getCategoryTitle, getCurrentLang, getCurrentLinkType, getCurrentAppTheme, updateLocalStorageSettings } from '../../../shared/functions';


export type AppState = {
  category: string,
  settings: Settings
};


const initialState: AppState = {
  category: getCategoryTitle(),
  settings: {
    lang: getCurrentLang(),
    linkType: getCurrentLinkType(),
    darkTheme: getCurrentAppTheme() === 'dark'
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
    setDarkTheme: (state, {payload}: {payload: SupportedThemes}) => {
      const theme = getCurrentAppTheme(payload);
      state.settings.darkTheme = theme === 'dark';
      updateLocalStorageSettings('theme', payload);
    },
    setLinkType: (state, {payload}: {payload: LinkTypes}) => {
      state.settings.linkType = payload;
      updateLocalStorageSettings('linkType', payload);
    }
  }
});


export const { setCategory, setNewLang, setDarkTheme, setLinkType } = appSlice.actions;
export default appSlice.reducer;
