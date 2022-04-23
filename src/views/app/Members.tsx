import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Members from '../../components/app/categories/members';


const MembersView: FC = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = `${t('brand')} - ${t('members.title')}`;
  }, [t]);


  return (
    <div className="members-view">
      <Members/>
    </div>
  );
};


export default MembersView;
