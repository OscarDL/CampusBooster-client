import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tool from '../Tool';

import { ToolLink } from '../../../../../shared/types/tools';


const Security: FC = () => {
  const { t } = useTranslation();

  const links: ToolLink[] = t('tools.netsec.links', {returnObjects: true});


  return (
    <>
      {links.map(link => (
        <Tool
          img={link.img}
          key={link.url}
          url={link.url}
          category="netsec"
          title={link.title}
          description={link.description}
        />
      ))}
    </>
  );
};


export default Security;
