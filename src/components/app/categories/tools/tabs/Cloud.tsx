import { FC } from 'react';
import { useTranslation } from 'react-i18next';


const Cloud: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <p>{t('cloud')}</p>
    </>
  );
};


export default Cloud;
