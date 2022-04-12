import { FC } from 'react';
import { ButtonBase } from '@mui/material';


type Props = {
  img: string,
  url: string,
  title: string,
  category: string,
  description: string
};


const Tool: FC<Props> = ({img, url, title, category, description}) => (
  <ButtonBase
    href={url}
    component="a"
    target="_blank"
    rel="noreferrer"
    classes={{root: 'tool'}}
  >
    <div className="tool__header">
      <img src={`/assets/images/tools/${category}/${img}`} alt="logo"/>
    </div>

    <div className="tool__content">
      <h2 title={title}>{title}</h2>
      <p title={description}>{description}</p>
    </div>
  </ButtonBase>
);


export default Tool;
