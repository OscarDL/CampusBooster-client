import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getSummary } from '../../../../store/features/home/slice';
import { ContentBody, ContentHeader } from '../../../shared/content';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import Container from '../../../shared/container';
import { Typography } from '@mui/material';


const Gdpr: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { summary } = useAppSelector(state => state.home);


  useEffect(() => {
    if (!summary) dispatch(getSummary());
  }, [summary, dispatch]);


  return (
    <>
      <ContentHeader title={t('gdpr.title')}/>

      <ContentBody>
        <Container>
          <Typography>
            {t('gdpr.intro.text')}

            <ul>
              <li>{t('gdpr.intro.item_1')}</li>
              <li>{t('gdpr.intro.item_2')}</li>
              <li>{t('gdpr.intro.item_3')}</li>
            </ul>

            <h2>{t('gdpr.article_1.title')}</h2>
            <ol>
              <li>{t('gdpr.article_1.1')}</li>
              <li>{t('gdpr.article_1.2')}</li>
              <li>{t('gdpr.article_1.3')}</li>
              <li>{t('gdpr.article_1.4')}</li>
            </ol>

            <h2>{t('gdpr.article_2.title')}</h2>
            <p>{t('gdpr.article_2.text')}</p>

            <h2>{t('gdpr.article_3.title')}</h2>
            <p>{t('gdpr.article_3.1')}</p>
            <p>{t('gdpr.article_3.2')}</p>

            <h2>{t('gdpr.article_4.title')}</h2>
            <p>{t('gdpr.article_4.text')}</p>
            <ul>
              <li>{t('gdpr.article_4.1')}</li>
              <li>{t('gdpr.article_4.2')}</li>
              <li>{t('gdpr.article_4.3')}</li>
            </ul>

            <h2>{t('gdpr.article_5.title')}</h2>
            <p>{t('gdpr.article_5.1')}</p>
            <p>{t('gdpr.article_5.2')}</p>
            <p>{t('gdpr.article_5.3.text')}</p>
            <ul>
              <li>{t('gdpr.article_5.3.1')}</li>
              <li>{t('gdpr.article_5.3.2')}</li>
            </ul>
            <p>{t('gdpr.article_5.4')}</p>
            <p>{t('gdpr.article_5.5')}</p>

            <h2>{t('gdpr.article_6.title')}</h2>
            <p>{t('gdpr.article_6.1')}</p>
            <p>{t('gdpr.article_6.2')}</p>
            <p>{t('gdpr.article_6.3')}</p>

            <h2>{t('gdpr.article_7.title')}</h2>
            <p>{t('gdpr.article_7.text')}</p>
            <p>{t('gdpr.article_7.1')}</p>
            <p>{t('gdpr.article_7.2')}</p>
            <p>{t('gdpr.article_7.3.text')}</p>
            <ul>
              <li>{t('gdpr.article_7.3.1')}</li>
              <li>{t('gdpr.article_7.3.2')}</li>
              <li>{t('gdpr.article_7.3.3')}</li>
              <li>{t('gdpr.article_7.3.4')}</li>
              <li>{t('gdpr.article_7.3.5')}</li>
            </ul>
            <p>{t('gdpr.article_7.4')}</p>

            <h2>{t('gdpr.article_8.title')}</h2>
            <p>{t('gdpr.article_8.1.text')}</p>
            <ul>
              <li>{t('gdpr.article_8.1.1')}</li>
              <li>{t('gdpr.article_8.1.2')}</li>
              <li>{t('gdpr.article_8.1.3')}</li>
              <li>{t('gdpr.article_8.1.4')}</li>
              <li>{t('gdpr.article_8.1.5')}</li>
            </ul>
            <p>{t('gdpr.article_8.2')}</p>
            <p>{t('gdpr.article_8.3')}</p>
            <p>{t('gdpr.article_8.4')}</p>
            <p>{t('gdpr.article_8.5')}</p>
            <p>{t('gdpr.article_8.6')}</p>
            <p>{t('gdpr.article_8.7')}</p>
            <p>{t('gdpr.article_8.8')}</p>

            <h2>{t('gdpr.article_9.title')}</h2>
            <p>{t('gdpr.article_9.text')}</p>
            <ul>
              <li>{t('gdpr.article_9.1')}</li>
              <li>{t('gdpr.article_9.2')}</li>
              <li>{t('gdpr.article_9.3')}</li>
              <li>{t('gdpr.article_9.4')}</li>
              <li>{t('gdpr.article_9.5')}</li>
              <li>{t('gdpr.article_9.6')}</li>
              <li>{t('gdpr.article_9.7')}</li>
            </ul>

            <h2>{t('gdpr.article_10.title')}</h2>
            <p>{t('gdpr.article_10.1')}</p>
            <p>{t('gdpr.article_10.2')}</p>

            <h2>{t('gdpr.article_11.title')}</h2>
            <p>{t('gdpr.article_11.text')}</p>
            <ul>
              <li>{t('gdpr.article_11.1')}</li>
              <li>{t('gdpr.article_11.2')}</li>
              <li>{t('gdpr.article_11.3')}</li>
              <li>{t('gdpr.article_11.4')}</li>
            </ul>

            <h2>{t('gdpr.article_12.title')}</h2>
            <p>{t('gdpr.article_12.1')}</p>
            <p>{t('gdpr.article_12.2')}</p>
            <p>{t('gdpr.article_12.3')}</p>
            <p>{t('gdpr.article_12.4')}</p>
            <p>{t('gdpr.article_12.5')}</p>

            <h2>{t('gdpr.article_13.title')}</h2>
            <p>{t('gdpr.article_13.1')}</p>
            <p>{t('gdpr.article_13.2')}</p>
            <p>{t('gdpr.article_13.3')}</p>
            <p>{t('gdpr.article_13.4')}</p>
            <p>{t('gdpr.article_13.5.text')}</p>
            <ul>
              <li>{t('gdpr.article_13.5.1')}</li>
            </ul>
            <p>{t('gdpr.article_13.6')}</p>

            <h2>{t('gdpr.article_14.title')}</h2>
            <p>{t('gdpr.article_14.text')}</p>

            <h2>{t('gdpr.article_15.title')}</h2>
            <p>{t('gdpr.article_15.text')}</p>

            <h2>{t('gdpr.article_16.title')}</h2>
            <p>{t('gdpr.article_16.text')}</p>
          </Typography>
        </Container>
      </ContentBody>
    </>
  );
};


export default Gdpr;
