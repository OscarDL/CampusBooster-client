import { FC } from 'react';

import { ToolLinkBase64Image } from '../../../../../shared/types/tool';

import Tool from '../tool/Tool';


type Props = {
  tools: ToolLinkBase64Image[]
};


const ToolTab: FC<Props> = ({tools}) => {
  return (
    <>
      {tools.sort((a, b) => a.title.localeCompare(b.title)).map(tool => (
        <Tool key={tool.id} tool={tool}/>
      ))}
    </>
  );
};


export default ToolTab;
