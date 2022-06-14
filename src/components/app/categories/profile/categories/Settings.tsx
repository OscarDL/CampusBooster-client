import { FC } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { ContentHeader } from '../../../../shared/content';
import { useStateWithCallback } from '../../../../../shared/hooks';
import { supportedLangs } from '../../../../../shared/utils/locales';
import { getLocalStorageSettings } from '../../../../../shared/functions';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { setNewLang, setAppTheme, setLinkType } from '../../../../../store/features/app/slice';
import { LinkTypes, SupportedLangs, SupportedThemes } from '../../../../../shared/types/settings';

import Container from '../../../../shared/container';


const getCurrentSavedTheme = (): SupportedThemes => {
  const settings = getLocalStorageSettings();

  switch (settings.theme as SupportedThemes) {
    case 'light': return SupportedThemes.Light;
    case 'dark': return SupportedThemes.Dark;
    default: return SupportedThemes.System;
  };
};


const Settings: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector(state => state.app);

  const [theme, setTheme] = useStateWithCallback(getCurrentSavedTheme());


  const handleChangeLang = (e: SelectChangeEvent<SupportedLangs>) => {
    const newLang = e.target.value as SupportedLangs;
    i18next.changeLanguage(newLang).then(() => dispatch(setNewLang(newLang)));
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

      <div>
        <FormControl sx={{width: '100%', mt: 1}} size="small">
          <InputLabel>{t('profile.settings.lang.title')}</InputLabel>

          <Select
            className="select"
            value={settings.lang}
            onChange={handleChangeLang}
            label={t('profile.settings.lang.title')}
          >
            {supportedLangs.map(lang => (
              <MenuItem key={lang} value={lang}>
                {t('profile.settings.lang.' + lang) + ' '}
                {settings.lang !== lang && t('profile.settings.lang.(' + lang + ')')}
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
            {Object.values(SupportedThemes).map(theme => (
              <MenuItem key={theme} value={theme}>
                {t('profile.settings.theme.' + theme)}
              </MenuItem>
            ))}
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
            {Object.values(LinkTypes).map(linkType => (
              <MenuItem
                key={linkType} value={linkType}
                id={'profile-link-type-' + linkType}
              >
                {t('profile.settings.links.' + linkType)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Container>
  );
};


export default Settings;
