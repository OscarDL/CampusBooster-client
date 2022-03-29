import { FC } from 'react';

import { ContentBody } from '../../../shared/content';
import { LogoutButton } from '../../../../azure/auth/Buttons';

import './Settings.css';


const Settings: FC = () => {
  return (
    <ContentBody>
      <LogoutButton/>
      <br/><br/>
      <LogoutButton logoutFromAzure/>
    </ContentBody>
  );
};


export default Settings;
