import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);


type Props = {
  subjects: any[]
};


const Summary: FC<Props> = ({subjects}) => {
  const { t } = useTranslation();

  const earnedCredits = subjects.map(sub => sub.earned).reduce((a, b) => a + b);
  const requiredCredits = subjects.filter(sub => !sub.optional).map(sub => sub.credits).reduce((a, b) => a + b);
  const totalCredits = subjects.map(sub => sub.credits).reduce((a, b) => a + b);


  return (
    <div className="summary-credits">
      <Doughnut
        data={{
          labels: ['Current', 'Required', 'Total'],
          datasets: [{
            data: [
              earnedCredits,
              requiredCredits - earnedCredits < 0 ? 0 : requiredCredits - earnedCredits,
              totalCredits - Math.max(requiredCredits, earnedCredits)
            ],
            backgroundColor: ['#4d4', '#da2', '#28d'],
            label: t('summary.credits.title'),
            
          }],
        }}

        options={{
          plugins: {
            legend: {
              onClick: () => null
            }
          }
        }}
      />
    </div>
  );
};


export default Summary;
