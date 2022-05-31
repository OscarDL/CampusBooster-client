import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Home from '../../../components/app/categories/home';

import './Home.css';


const HomeView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('home.title')}`;
  }, [t]);


  return (
    <div className="home-view">
      <Home/>
    </div>
  );
};


export default HomeView;
