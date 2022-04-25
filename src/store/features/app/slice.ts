import dayjs from 'dayjs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dayjsLocales } from '../../../shared/utils';
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
    setCategory: (state, {payload}: {payload: string}) => {
      state.category = payload;
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(setNewLang.fulfilled, (state, {payload}) => {
        dayjs.locale(payload);
        state.settings.lang = payload;
      });
  }
});


export const { setCategory, setDarkTheme, setLinkType } = appSlice.actions;
export default appSlice.reducer;
