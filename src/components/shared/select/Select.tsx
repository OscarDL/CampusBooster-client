import { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from '@mui/material';

import './Select.css';


type Option = {
  name: string,
  value: string
};

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  title: string,
  options: Option[],
  onChange: (event: SelectChangeEvent) => void
};


const Select: FC<Props> = ({title, options, onChange, ...props}) => {
  return (
    <FormControl className="select" size="small">
      <InputLabel>{title}</InputLabel>

      <MuiSelect
        onChange={onChange}
        sx={{width: '100%'}}
        value={String(props.value)}
      >
        {options.map(option => (
          <MenuItem value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};


export default Select;
