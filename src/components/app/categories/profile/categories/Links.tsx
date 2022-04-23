import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';



const Links: FC = () => {
  const { t } = useTranslation();


  return (
    <Container className="links">
      <ContentHeader title={t('profile.links.title')}/>

      <div>hello</div>
    </Container>
  );
};


export default Links;
