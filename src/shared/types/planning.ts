import dayjs from 'dayjs';
import { PickersDayProps } from '@mui/x-date-pickers';

import { ClassroomHasCourse } from './classroom';


export enum PlanningType {
  PracticeExam = 'PRACTICE_EXAM',
  OralExam = 'ORAL_EXAM',
  Course = 'COURSE',
  Today = 'TODAY',
  Empty = ''
};

export enum PlanningPeriod {
  FullDay = 'FULL_DAY',
  Morning = 'MORNING',
  Afternoon = 'AFTERNOON'
};


export type RenderDay = (
  day: dayjs.Dayjs,
  selectedDates: (dayjs.Dayjs | null)[],
  pickerDateProps: PickersDayProps<dayjs.Dayjs>
) => JSX.Element;

export type Planning = {
  id: number,
  date: string,
  cancelled: boolean,
  type: PlanningType,
  period: PlanningPeriod,
  classroomHasCourseId: number,

  ClassroomHasCourse: ClassroomHasCourse
};

export type PlanningRequest = {
  id?: number,
  date: string,
  cancelled: boolean,
  type: PlanningType,
  period: PlanningPeriod,
  classroomHasCourseId: number
};
