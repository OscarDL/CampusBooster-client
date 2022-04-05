import { FC, useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { Chart, ArcElement, Tooltip, Legend, LayoutPosition } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);


type Props = {
  subjects: any[]
};


const ECTS: FC<Props> = ({subjects}) => {
  const { t } = useTranslation();
  const [legendPos, setLegendPos] = useState<LayoutPosition>(window.innerWidth > 768 ? 'right' : 'bottom');

  const earnedCredits = subjects.map(sub => sub.earned).reduce((a, b) => a + b);
  const requiredCredits = subjects.filter(sub => !sub.optional).map(sub => sub.credits).reduce((a, b) => a + b);
  const totalCredits = subjects.map(sub => sub.credits).reduce((a, b) => a + b);

  const data = useMemo(() => ({
    labels: [
      t('summary.credits.earned'),
      t('summary.credits.required'),
      t('summary.credits.total')
    ],

    datasets: [{
      data: [
        earnedCredits,
        requiredCredits - earnedCredits < 0 ? 0 : requiredCredits - earnedCredits,
        totalCredits - Math.max(requiredCredits, earnedCredits)
      ],
      backgroundColor: ['#4d4', '#da2', '#28d'],
      label: t('summary.credits.title'),
    }]
  }), [earnedCredits, requiredCredits, totalCredits, t]);


  useEffect(() => {
    const adaptLayout = (e: UIEvent) => {
      const target = e.target as Window;
      setLegendPos(target.innerWidth > 768 ? 'right' : 'bottom');
    }

    window.addEventListener('resize', adaptLayout);

    return () => window.removeEventListener('resize', adaptLayout);
  }, []);


  return (
    <div className="summary-credits">
      <Doughnut
        data={data}

        height="200"

        options={{
          cutout: '66%',
          radius: '90%',

          plugins: {
            legend: {
              align: 'center',
              position: legendPos,
              onClick: () => null,

              labels: {
                font: {
                  size: 16
                }
              }
            },

            title: t('summary.credits.title')
          }
        }}
      />
    </div>
  );
};


export default ECTS;
