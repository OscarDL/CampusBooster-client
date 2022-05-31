import { TFunction } from 'react-i18next';
import { _DeepPartialObject } from 'chart.js/types/utils';
import { CoreChartOptions, DatasetChartOptions, DoughnutControllerChartOptions, ElementChartOptions, LayoutPosition, PluginChartOptions, ScaleChartOptions } from 'chart.js';


type DonutChartOptions = _DeepPartialObject<CoreChartOptions<'doughnut'> & ElementChartOptions<'doughnut'> & PluginChartOptions<'doughnut'> & DatasetChartOptions<'doughnut'> & ScaleChartOptions<'doughnut'> & DoughnutControllerChartOptions>;


export const getDonutChartOptions = (t: TFunction, legendPos: LayoutPosition): DonutChartOptions => ({
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

    title: t('home.credits.title')
  }
});


export const getLayoutPosition = (target: Window = window) => {
  const layoutWidthChange= 480; // px
  return target.innerWidth > layoutWidthChange ? 'right' : 'bottom';
}
