import { useTranslation } from 'react-i18next';


function Header() {
  const { t } = useTranslation();

  return (
    <div className="branding">
      <img src="/assets/images/logo.png" alt="Logo"/>
      <span>{t('global.dashboard')}</span>
    </div>
  );
};


export default Header;
