import { createSlice } from '@reduxjs/toolkit';

import { Settings } from '../../../shared/types/settings';


const initialState: Settings = {
  lang: 'en'
};


const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      console.log('change lang');
    }
  }
});


export const { changeLang } = settingsSlice.actions;
export default settingsSlice.reducer;
