import { FC, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { values } from '../../../../../shared/utils';
import { ContentHeader } from '../../../../shared/content';
import { setNewLang, setNewTheme } from '../../../../../store/features/app/slice';
import { SupportedLangs, SupportedThemes } from '../../../../../shared/types/settings';

import Container from '../../../../shared/container';


const getCurrentTheme = (): SupportedThemes => {
  switch (localStorage.getItem('theme')) {
    case 'dark': return 'dark';
    case 'light': return 'light';
    default: return 'system';
  };
};


const Settings: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { settings } = useSelector(state => state.app);
  const [theme, setTheme] = useState<SupportedThemes>(getCurrentTheme());


  const handleChangeLang = (e: SelectChangeEvent<SupportedLangs>) => {
    const newLang = e.target.value as SupportedLangs;

    dispatch(setNewLang(newLang));
    i18next.changeLanguage(newLang);
  };

  const handleChangeTheme = (e: SelectChangeEvent<SupportedThemes>) => {
    const theme = e.target.value as SupportedThemes;

    setTheme(theme);
    dispatch(setNewTheme(theme));
    localStorage.setItem('theme', theme);
  };


  return (
    <Container className="settings">
      <ContentHeader title={t('profile.settings.title')}/>

      <FormControl sx={{width: '100%', mt: 1}} size="small">
        <InputLabel>{t('profile.settings.lang.title')}</InputLabel>

        <Select
          className="select"
          value={settings.lang}
          onChange={handleChangeLang}
          label={t('profile.settings.lang.title')}
        >
          {values.supportedLangs.map(lang => (
            <MenuItem key={lang} value={lang}>
              {t('profile.settings.lang.' + lang)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{width: '100%', mt: 3}} size="small">
        <InputLabel>{t('profile.settings.theme.title')}</InputLabel>

        <Select
          value={theme}
          className="select"
          onChange={handleChangeTheme}
          label={t('profile.settings.theme.title')}
        >
          <MenuItem value="system">
            {t('profile.settings.theme.system')}
          </MenuItem>
          <MenuItem value="light">
            {t('profile.settings.theme.light')}
          </MenuItem>
          <MenuItem value="dark">
            {t('profile.settings.theme.dark')}
          </MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};


export default Settings;
