import dayjs from 'dayjs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dayjsLocales } from '../../../shared/utils/locales';
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
      pageSize: settings.dataGrid?.pageSize ?? 50,
      pagination: settings.dataGrid?.pagination ?? true
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
  };
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

    setDataGridValue: (state: AppState, {payload}: {payload: {key: keyof Settings['dataGrid'], value: any}}) => {
      const dataGrid = {
        ...state.settings.dataGrid,
        [payload.key]: payload.value
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


export const { setCategory, setAppTheme, setLinkType, setDataGridValue } = appSlice.actions;
export default appSlice.reducer;
