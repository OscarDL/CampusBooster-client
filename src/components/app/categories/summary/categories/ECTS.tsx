import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useMemo, useState } from 'react';

import { ContentHeader } from '../../../../shared/content';
import { getDonutChartOptions, getLayoutPosition } from '../utils';


import { Chart, ArcElement, Tooltip, Legend, LayoutPosition } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);


type Props = {
  subjects: any[]
};


const ECTS: FC<Props> = ({subjects}) => {
  const { t } = useTranslation();
  const [legendPos, setLegendPos] = useState<LayoutPosition>(getLayoutPosition());

  const earned = subjects.map(sub => sub.earned).reduce((a, b) => a + b);
  const required = subjects.filter(sub => !sub.optional).map(sub => sub.credits).reduce((a, b) => a + b);
  const total = subjects.map(sub => sub.credits).reduce((a, b) => a + b);


  const data = useMemo(() => ({
    labels: [
      t('summary.credits.earned'),
      t('summary.credits.required'),
      t('summary.credits.total')
    ],

    datasets: [{
      data: [
        earned,
        required - earned < 0 ? 0 : required - earned,
        total - Math.max(required, earned)
      ],
      backgroundColor: ['#4d4', '#da2', '#28d'],
      label: t('summary.credits.title'),
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


  return (
    <div className="summary-ects">
      <ContentHeader title={t('summary.credits.title', {earned, required})}/>

      <Doughnut
        data={data}
        height={150}
        options={getDonutChartOptions(t, legendPos)}
      />
    </div>
  );
};


export default ECTS;
