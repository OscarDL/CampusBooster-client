import dayjs from 'dayjs';
import { PickersDayProps } from '@mui/x-date-pickers';

import { Course } from './course';


export type RenderDay = (
  day: dayjs.Dayjs,
  selectedDates: (dayjs.Dayjs | null)[],
  pickerDateProps: PickersDayProps<dayjs.Dayjs>
) => JSX.Element;

export type Task = {
  title: string,
  course: Course,
  details: string,
  dateStart: Date,
  dateEnd: Date
};
