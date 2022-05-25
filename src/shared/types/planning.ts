import dayjs from 'dayjs';
import { PickersDayProps } from '@mui/x-date-pickers';

import { ClassroomHasCourse } from './classroom';


export type RenderDay = (
  day: dayjs.Dayjs,
  selectedDates: (dayjs.Dayjs | null)[],
  pickerDateProps: PickersDayProps<dayjs.Dayjs>
) => JSX.Element;

export type Planning = {
  id: number;
  date: string,
  cancelled: boolean,
  classroomHasCourseId: number,

  ClassroomHasCourse?: ClassroomHasCourse
};

export type PlanningRequest = {
  id?: number;
  date: string,
  cancelled: boolean,
  classroomHasCourseId: number,

  ClassroomHasCourse?: ClassroomHasCourse
};
