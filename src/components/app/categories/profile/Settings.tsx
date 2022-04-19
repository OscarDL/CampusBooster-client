import { FC } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { values } from '../../../../shared/utils';
import { ContentHeader } from '../../../shared/content';
import { setNewLang } from '../../../../store/features/app/slice';
import { SupportedLangs } from '../../../../shared/types/settings';

import Container from '../../../shared/container';


const Settings: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { settings } = useSelector(state => state.app);


  const handleChangeLang = (e: SelectChangeEvent<SupportedLangs>) => {
    const newLang = e.target.value;
    dispatch(setNewLang(newLang));
    i18next.changeLanguage(newLang);
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
    </Container>
  );
};


export default Settings;
