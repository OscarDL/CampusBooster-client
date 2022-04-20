import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tool from '../Tool';

import { ToolLink } from '../../../../../shared/types/tools';


const Infrastructure: FC = () => {
  const { t } = useTranslation();

  const links: ToolLink[] = t('tools.infrastructure.links', {returnObjects: true});


  return (
    <>
      {links.map((link, key) => (
        <Tool
          key={key}
          img={link.img}
          url={link.url}
          title={link.title}
          category="infrastructure"
          description={link.description}
        />
      ))}
    </>
  );
};


export default Infrastructure;
