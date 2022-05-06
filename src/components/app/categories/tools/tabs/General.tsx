import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tool from '../tool/Tool';

import { ToolLink } from '../../../../../shared/types/tools';


const General: FC = () => {
  const { t } = useTranslation();

  const links: ToolLink[] = t('tools.general.links', {returnObjects: true});


  return (
    <>
      {links.map((link, key) => (
        <Tool
          key={key}
          img={link.img}
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
