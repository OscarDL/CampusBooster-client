import { enUS, frFR } from '@mui/x-data-grid-pro';

import { SupportedLangs } from '../types/settings';


export const supportedLangs: SupportedLangs[] = ['en', 'fr'];

export const dayjsLocales = {
  en: () => import('dayjs/locale/en'),
  fr: () => import('dayjs/locale/fr')
};

export const getMuiDataGridLocale = (lang: SupportedLangs) => {
  let localization;

  switch(lang) {
    case 'fr': {
      localization = frFR;
      break;
    }

    default: localization = enUS;
  };

  return localization.components.MuiDataGrid.defaultProps.localeText;
};