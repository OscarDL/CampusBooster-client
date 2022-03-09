import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LogoutButton } from '../../../azure/auth/Buttons';
import { logout } from '../../../store/features/auth/authSlice';

import './Settings.css';


function Settings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };


  useEffect(() => {
    document.title = `${t('brand')} - ${t('settings.title')}`;
  }, [t]);


  return (
    <div className="settings">
      <p>Settings page</p>
      Logout from website: <LogoutButton handleLogout={handleLogout}/><br/>
      Logout from Azure: <LogoutButton handleLogout={handleLogout} logoutFromAzure/>
    </div>
  );
};


export default Settings;
