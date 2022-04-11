import { FC } from 'react';
import { useTranslation } from 'react-i18next';


type Props = {
  img: string,
  url: string,
  title: string,
  description: string
};


const Tool: FC<Props> = ({img, url, title, description}) => {
  const { t } = useTranslation();

  const getDomain = (url: string): string => {
    if (url.startsWith('http')) {
      const https = url.startsWith('https://');
      url = url.substring(https ? 8 : 7);

      const end = url.includes('/') ? url.indexOf('/') : url.length;
      return url.substring(0, end);
    }

    const end = url.endsWith('/') ? url.indexOf('/') : url.length;
    return url.substring(0, end);
  };


  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="tool"
    >
      <div className="tool__header">
        <img src={`/assets/images/tools/${img}`} alt={img}/>
        {/* <p>{getDomain(url)}</p> */}
      </div>

      <div className="tool__content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </a>
  );
};


export default Tool;
