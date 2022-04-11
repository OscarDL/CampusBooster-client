import { FC } from 'react';
import { useTranslation } from 'react-i18next';


const Security: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <p>{t('security')}</p>
    </>
  );
};


export default Security;
