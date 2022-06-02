import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Contracts from '../../../components/app/categories/contracts';

import './Contracts.css';


const ContractsView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('contracts.title')}`;
  }, [t]);


  return (
    <div className="contracts-view">
      <Contracts/>
    </div>
  );
};


export default ContractsView;
