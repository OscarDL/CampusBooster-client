import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LogoutButton } from '../../../azure/auth/Buttons';
import { getLoggedInAuthState } from '../../../shared/utils';
import { logout } from '../../../store/features/auth/authSlice';

import './Summary.css';


function Summary() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {user} = useSelector(getLoggedInAuthState);


  useEffect(() => {
    document.title = `${t('brand')} - ${t('summary.title')}`;
  }, [t]);


  return (
    <div className="summary">
      <p>Summary page</p>
      <LogoutButton user={user} handleLogout={() => dispatch(logout(true))}/>
    </div>
  );
};


export default Summary;
