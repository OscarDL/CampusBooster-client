import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tool from '../Tool';

import { ToolLink } from '../../../../../shared/types/tools';


const Security: FC = () => {
  const { t } = useTranslation();

  const links: ToolLink[] = t('tools.net-sec.links', {returnObjects: true});


  return (
    <>
      {links.map((link, key) => (
        <Tool
          key={key}
          img={link.img}
          url={link.url}
          title={link.title}
          category="net-sec"
          description={link.description}
        />
      ))}
    </>
  );
};


export default Security;
