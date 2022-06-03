import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { CourseRequest } from '../../../../../shared/types/course';
import { createCourse } from '../../../../../store/features/courses/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const newCourseRequest = (): CourseRequest => ({
  name: '', description: '', link: '', speciality: false, credits: 1, year: 1
});


const CreateCourse: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(newCourseRequest());



  const formIsComplete = () => (
    course.name &&
    course.link &&
    course.credits &&
    course.description
  );

  const handleChangeYearCredits = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'year' | 'credits') => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setCourse({...course, [type]: value});
  };

  const handleCreateCourse = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createCourse(course)).unwrap();

      setOpen(false);
      setCourse(newCourseRequest());
      toast.success(t('courses.create.success', {course: course.name}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleCreateCourse}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('courses.create.title')}</DialogTitle>

      <DialogContent>
        <TextField
          required
          variant="standard"
          value={course.name}
          name="cb-course-name"
          label={t('courses.fields.name')}
          onChange={e => setCourse({...course, name: e.target.value})}
          InputProps={{endAdornment: <InputAdornment position="end" sx={{color: 'unset'}}>
            <FormGroup>
              <FormControlLabel
                label={t('courses.fields.speciality')}
                control={<Checkbox
                  checked={course.speciality}
                  onChange={e => setCourse({...course, speciality: e.target.checked})}
                />}
              />
            </FormGroup>
          </InputAdornment>}}
        />

        <TextField
          sx={{my: 2}}
          required fullWidth
          variant="standard"
          value={course.link}
          name="cb-course-link"
          label={t('courses.fields.link')}
          onChange={e => setCourse({...course, link: e.target.value})}
        />

        <Box className="MuiDialogContent-row" sx={{mb: 2}}>
          <TextField
            required
            type="number"
            variant="standard"
            value={course.year}
            name="cb-course-year"
            label={t('courses.fields.year')}
            InputProps={{autoComplete: Date.now().toString()}}
            onChange={e => handleChangeYearCredits(e, 'year')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 5}}
          />
          <TextField
            required
            type="number"
            variant="standard"
            value={course.credits}
            name="cb-course-credits"
            label={t('courses.fields.credits')}
            InputProps={{autoComplete: Date.now().toString()}}
            onChange={e => handleChangeYearCredits(e, 'credits')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: 1}}
          />
        </Box>

        <TextField
          margin="dense"
          value={course.description}
          name="cb-course-description"
          required fullWidth multiline
          label={t('courses.fields.description')}
          onChange={e => setCourse({...course, description: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          disabled={!formIsComplete()}
          type="submit" variant="contained" loading={loading}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateCourse;
