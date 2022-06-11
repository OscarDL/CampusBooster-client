import ReactTooltip from 'react-tooltip';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'react-minimal-pie-chart';

import { Summary } from '../../../../../shared/types/home';
import { ContentHeader } from '../../../../shared/content';
import { maxYearlyCredits, requiredYearlyCredits } from '../../../../../shared/utils/values';

import Container from '../../../../shared/container';


type Props = {
  summary: Summary
};

enum ChartColor {
  blue = '#28d',
  green = '#4d4',
  yellow = '#da2'
};


const Credits: FC<Props> = ({summary}) => {
  const { t } = useTranslation();

  const [hovered, setHovered] = useState<number>();

  const total = maxYearlyCredits;
  const required = requiredYearlyCredits;


  const credits = useMemo(() => summary.annualCredits ?? 0, [summary.annualCredits]);

  const data = useMemo(() => ([
    {
      value: credits,
      color: ChartColor.green,
      tooltip: `${t('home.credits.earned')}${t('global.colon')} ${credits}`
    },
    {
      color: ChartColor.yellow,
      value: required - credits < 0 ? 0 : required - credits,
      tooltip: `${t('home.credits.required')}${t('global.colon')} ${required}`
    },
    {
      color: ChartColor.blue,
      value: total - Math.max(required, credits),
      tooltip: `${t('home.credits.bonus')}${t('global.colon')} ${total - Math.max(required, credits)}`
    }
  ]), [credits, required, total, t]);


  return (
    <Container className="credits">
      <ContentHeader title={t('home.credits.title', {earned: summary.annualCredits ?? 0, required})}/>

      <div id="ects-pie" data-tip="" data-for="ects-pie">
        <PieChart
          animate
          data={data}
          lineWidth={30}
          startAngle={270}
          animationDuration={1000}
          style={{maxHeight: '20rem'}}
          onBlur={() => setHovered(undefined)}
          onMouseOut={() => setHovered(undefined)}
          onClick={(_, index) => setHovered(index)}
          onMouseOver={(_, index) => setHovered(index)}
          animationEasing="cubic-bezier(0.3, 0.9, 0.4, 1)"
        />

        <ul id="ects-legend">
          <li>
            <div style={{backgroundColor: ChartColor.green}}/>
            <p>{t('home.credits.earned')}</p>
          </li>
          <li>
            <div style={{backgroundColor: ChartColor.yellow}}/>
            <p>{t('home.credits.required')}</p>
          </li>
          <li>
            <div style={{backgroundColor: ChartColor.blue}}/>
            <p>{t('home.credits.bonus')}</p>
          </li>
        </ul>
        <ReactTooltip id="ects-pie" getContent={() => hovered !== undefined ? data[hovered].tooltip : null}/>
      </div>
    </Container>
  );
};


export default Credits;
