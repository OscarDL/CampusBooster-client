import { FC } from 'react';

import { ToolLinkBase64Image } from '../../../../../shared/types/tools';

import Tool from '../tool/Tool';


type Props = {
  tools: ToolLinkBase64Image[]
};


const ToolTab: FC<Props> = ({tools}) => {
  return (
    <>
      {tools.map(tool => (
        <Tool key={tool.id} tool={tool}/>
      ))}
    </>
  );
};


export default ToolTab;
