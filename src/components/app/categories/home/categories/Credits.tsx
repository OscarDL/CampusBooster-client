import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useMemo, useState } from 'react';

import { ContentHeader } from '../../../../shared/content';
import { getFakeCredits } from '../../../../../shared/fake/data';
import { getDonutChartOptions, getLayoutPosition } from '../utils';

import Loader from '../../../../shared/loader';
import Container from '../../../../shared/container';

import { Chart, ArcElement, Tooltip, Legend, LayoutPosition } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);



const Credits: FC = () => {
  const { t } = useTranslation();
  const [subjects, setSubjects] = useState<any[] | null>(null);
  const [legendPos, setLegendPos] = useState<LayoutPosition>(getLayoutPosition());

  const earned = subjects?.map(sub => sub.earned).reduce((a, b) => a + b);
  const required = subjects?.filter(sub => !sub.optional).map(sub => sub.credits).reduce((a, b) => a + b);
  const total = subjects?.map(sub => sub.credits).reduce((a, b) => a + b);


  const data = useMemo(() => ({
    labels: [
      t('profile.credits.earned'),
      t('profile.credits.required'),
      t('profile.credits.bonus')
    ],

    datasets: [{
      data: [
        earned,
        required - earned < 0 ? 0 : required - earned,
        total - Math.max(required, earned)
      ],
      backgroundColor: ['#4d4', '#da2', '#28d'],
      label: t('profile.credits.title'),
    }]
  }), [earned, required, total, t]);


  useEffect(() => {
    const adaptLayout = (e: UIEvent) => {
      const target = e.target as Window;
      setLegendPos(getLayoutPosition(target));
    }

    window.addEventListener('resize', adaptLayout);

    return () => window.removeEventListener('resize', adaptLayout);
  }, []);

  useEffect(() => {
    const getSubjects = setTimeout(() => setSubjects(getFakeCredits()), 1000);
    return () => clearTimeout(getSubjects);
  }, []);


  return (
    <Container className="credits">
      <ContentHeader title={t('profile.credits.title', {earned, required})}/>

      {subjects ? (
        <Doughnut
          data={data}
          height={100}
          options={getDonutChartOptions(t, legendPos)}
        />
      ) : (
        <Loader/>
      )}
    </Container>
  );
};


export default Credits;
