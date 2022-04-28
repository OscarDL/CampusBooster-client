import { FC } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { values } from '../../../../../shared/utils';
import { ContentHeader } from '../../../../shared/content';
import { useStateWithCallback } from '../../../../../shared/hooks';
import { getLocalStorageSettings } from '../../../../../shared/functions';
import { setNewLang, setAppTheme, setLinkType } from '../../../../../store/features/app/slice';
import { LinkTypes, SupportedLangs, SupportedThemes } from '../../../../../shared/types/settings';

import Container from '../../../../shared/container';


const getCurrentSavedTheme = (): SupportedThemes => {
  const settings = getLocalStorageSettings();

  switch (settings.theme as SupportedThemes) {
    case 'dark': return 'dark';
    case 'light': return 'light';
    default: return 'system';
  };
};


const Settings: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { settings } = useSelector(state => state.app);
  const [theme, setTheme] = useStateWithCallback(getCurrentSavedTheme());


  const handleChangeLang = (e: SelectChangeEvent<SupportedLangs>) => {
    const newLang = e.target.value as SupportedLangs;
    dispatch(setNewLang(newLang));
    i18next.changeLanguage(newLang);
  };

  const handleChangeTheme = (e: SelectChangeEvent<SupportedThemes>) => {
    const theme = e.target.value as SupportedThemes;
    setTheme(theme, () => dispatch(setAppTheme(theme)));
  };

  const handleChangeLinkType = (e: SelectChangeEvent<LinkTypes>) => {
    const linkType = e.target.value as LinkTypes;
    dispatch(setLinkType(linkType));
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

      <FormControl sx={{width: '100%', mt: 3}} size="small">
        <InputLabel>{t('profile.settings.links.title')}</InputLabel>

        <Select
          className="select"
          value={settings.linkType}
          onChange={handleChangeLinkType}
          label={t('profile.settings.links.title')}
        >
          <MenuItem value="default">
            {t('profile.settings.links.default')}
          </MenuItem>
          <MenuItem value="bold">
            {t('profile.settings.links.bold')}
          </MenuItem>
          <MenuItem value="underline">
            {t('profile.settings.links.underline')}
          </MenuItem>
          <MenuItem value="bold-underline">
            {t('profile.settings.links.bold-underline')}
          </MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};


export default Settings;
