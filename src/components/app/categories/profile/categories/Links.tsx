import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentHeader } from '../../../../shared/content';

import Container from '../../../../shared/container';



const Links: FC = () => {
  const { t } = useTranslation();

  const links = t('profile.links.list', {returnObjects: true}) as any[];


  return (
    <Container className="links">
      <ContentHeader title={t('profile.links.title')}/>

      <ul>
        {links?.map(link => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer">
              <span>{link.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
};


export default Links;
