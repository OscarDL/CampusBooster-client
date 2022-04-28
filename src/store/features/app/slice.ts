import dayjs from 'dayjs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dayjsLocales } from '../../../shared/utils';
import { LinkTypes, Settings, SupportedLangs, SupportedThemes } from '../../../shared/types/settings';
import { getCategoryTitle, getLocalStorageSettings, updateLocalStorageSettings } from '../../../shared/functions';


export type AppState = {
  category: string,
  settings: Settings
};


const settings = getLocalStorageSettings();

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
    setCategory: (state, {payload}: {payload: string}) => {
      state.category = payload;
    },
    setAppTheme: (state, {payload}: {payload: SupportedThemes}) => {
      state.settings.theme = payload;
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


export const { setCategory, setAppTheme, setLinkType } = appSlice.actions;
export default appSlice.reducer;
