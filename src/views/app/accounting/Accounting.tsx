import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Accounting from '../../../components/app/categories/accounting';

import './Accounting.css';


const AccountingView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('accounting.title')}`;
  }, [t]);


  return (
    <div className="accounting-view">
      <Accounting/>
    </div>
  );
};


export default AccountingView;
