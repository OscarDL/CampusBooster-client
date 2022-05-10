import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import Container from '../../../shared/container';

import { getFakeCredits } from '../../../../shared/fake/data';
import { ContentBody, ContentHeader } from '../../../shared/content';

import ECTS from './categories/ECTS';
import Loader from '../../../shared/loader';

import './Summary.css';


const Summary: FC = () => {
  const { t } = useTranslation();
  const [subjects, setSubjects] = useState<any[] | null>(null);


  useEffect(() => {
    const getSubjects = setTimeout(() => setSubjects(getFakeCredits()), 1000);
    return () => clearTimeout(getSubjects);
  }, []);


  return (
    <>
      <ContentHeader title={t('summary.title')}/>

      {subjects ? (
        <ContentBody>
          <Container>
            <ECTS subjects={subjects}/>
          </Container>

          <Container>
            Infos &amp; actus
          </Container>
        </ContentBody>
      ) : (
        <Loader fullSize/>
      )}
    </>
  );
};


export default Summary;
