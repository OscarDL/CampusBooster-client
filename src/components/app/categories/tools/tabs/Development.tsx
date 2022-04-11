import { FC } from 'react';
import { useTranslation } from 'react-i18next';


const Development: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <p>{t('development')}</p>
    </>
  );
};


export default Development;
