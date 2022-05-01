import dayjs from 'dayjs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dayjsLocales } from '../../../shared/utils';
import { LinkTypes, Settings, SupportedLangs, SupportedThemes } from '../../../shared/types/settings';
import { getCategoryTitle, getLocalStorageSettings, updateLocalStorageSettings } from '../../../shared/functions';


export type AppState = {
  category: string,
  settings: Settings
};


const settings = {
  ...getLocalStorageSettings(),
  lang: localStorage.getItem('lang')
};

const initialState: AppState = {
  category: getCategoryTitle(),
  settings: {
    lang: settings.lang ?? 'en',
    theme: settings.theme ?? 'system',
    linkType: settings.linkType ?? 'default'
  }
};


// in order to dynamically load the dayjs locale, we need to use an asynchronous function on lang change
export const setNewLang = createAsyncThunk('app/setNewLang', async (lang: SupportedLangs, thunkAPI) => {
  try {
    await dayjsLocales[lang]();
    return lang;
  }

  catch (error: any) {
    const message = error || 'error';
    return thunkAPI.rejectWithValue(message);
  }
});


const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setCategory: (state, {payload: category}: {payload: string}) => {
      state.category = category;
    },
    setAppTheme: (state, {payload: theme}: {payload: SupportedThemes}) => {
      state.settings.theme = theme;
      updateLocalStorageSettings('theme', theme);
    },
    setLinkType: (state, {payload: linkType}: {payload: LinkTypes}) => {
      state.settings.linkType = linkType;
      updateLocalStorageSettings('linkType', linkType);
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(setNewLang.fulfilled, (state, {payload: lang}) => {
        dayjs.locale(lang);
        state.settings.lang = lang;
      });
  }
});


export const { setCategory, setAppTheme, setLinkType } = appSlice.actions;
export default appSlice.reducer;
