import dayjs from 'dayjs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dayjsLocales } from '../../../shared/utils';
import { getLocalStorageSettings, updateLocalStorageSettings } from '../../../shared/functions';
import { LinkTypes, Settings, SupportedLangs, SupportedThemes } from '../../../shared/types/settings';


export type AppState = {
  category: string,
  settings: Settings
};


const settings = {
  ...getLocalStorageSettings(),
  lang: localStorage.getItem('lang')
};

const initialState: AppState = {
  category: '',
  settings: {
    lang: settings.lang ?? 'en',
    theme: settings.theme ?? 'system',
    linkType: settings.linkType ?? 'default',
    dataGrid: {
      pagination: false
    }
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
    setCategory: (state: AppState, {payload: category}: {payload: string}) => {
      state.category = category;
    },
    setAppTheme: (state: AppState, {payload: theme}: {payload: SupportedThemes}) => {
      state.settings.theme = theme;
      updateLocalStorageSettings('theme', theme);
    },
    setLinkType: (state: AppState, {payload: linkType}: {payload: LinkTypes}) => {
      state.settings.linkType = linkType;
      updateLocalStorageSettings('linkType', linkType);
    },
    setPagination: (state: AppState, {payload}: {payload: boolean}) => {
      const dataGrid = {
        ...state.settings.dataGrid,
        pagination: payload
      };

      state.settings.dataGrid = dataGrid;
      updateLocalStorageSettings('dataGrid', dataGrid);
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


export const { setCategory, setAppTheme, setLinkType, setPagination } = appSlice.actions;
export default appSlice.reducer;
