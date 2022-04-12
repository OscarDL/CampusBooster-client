import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tool from '../Tool';

import { ToolLink } from '../../../../../shared/types/tools';


const General: FC = () => {
  const { t } = useTranslation();

  const links: ToolLink[] = t('tools.general.links', {returnObjects: true});


  return (
    <>
      {links.map(link => (
        <Tool
          img={link.img}
          key={link.url}
          url={link.url}
          title={link.title}
          category="general"
          description={link.description}
        />
      ))}
    </>
  );
};


export default General;
