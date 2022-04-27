import dayjs from 'dayjs';
import { PickersDayProps } from '@mui/x-date-pickers';


export type RenderDay = (
  day: dayjs.Dayjs,
  selectedDates: (dayjs.Dayjs | null)[],
  pickerDateProps: PickersDayProps<dayjs.Dayjs>
) => JSX.Element;
