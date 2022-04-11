import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tool from '../Tool';


const General: FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <Tool img="azure.svg" url="https://portal.azure.com" title="Azure 15" description="Lorem ipsum dolor this is a description"/>
      <Tool img="azure.svg" url="http://portal.azure.com" title="Azure 16" description="Lorem ipsum dolor this is a description"/>
      <Tool img="azure.svg" url="portal.azure.com" title="Azure 17" description="Lorem ipsum dolor this is a description"/>
      <Tool img="azure.svg" url="https://portal.azure.com/test/" title="Azure 18" description="Lorem ipsum dolor this is a description"/>
    </>
  );
};


export default General;
