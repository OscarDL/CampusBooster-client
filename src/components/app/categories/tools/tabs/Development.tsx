import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tool from '../Tool';

import { ToolLink } from '../../../../../shared/types/tools';


const Development: FC = () => {
  const { t } = useTranslation();

  const links: ToolLink[] = t('tools.development.links', {returnObjects: true});


  return (
    <>
      {links.map(link => (
        <Tool
          img={link.img}
          key={link.url}
          url={link.url}
          title={link.title}
          category="development"
          description={link.description}
        />
      ))}
    </>
  );
};


export default Development;
