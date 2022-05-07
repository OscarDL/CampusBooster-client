import { FC } from 'react';

import { ToolLink } from '../../../../../shared/types/tools';

import Tool from '../tool/Tool';


type Props = {
  tools: ToolLink[]
};


const ToolTab: FC<Props> = ({tools}) => {
  return (
    <>
      {tools.map(tool => (
        <Tool
          key={tool.id}
          img={tool.img}
          url={tool.url}
          title={tool.title}
          category={tool.category}
          description={tool.description}
        />
      ))}
    </>
  );
};


export default ToolTab;
