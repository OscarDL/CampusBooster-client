import copy from 'fast-copy';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField } from '@mui/material';

import { Course } from '../../../../../shared/types/course';
import { useAppDispatch } from '../../../../../store/store';
import { updateCourse } from '../../../../../store/features/courses/slice';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  course: Course,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const UpdateCourse: FC<Props> = ({course, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [newCourse, setNewCourse] = useState(copy(course));


  const handleChangeYearCredits = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'year' | 'credits') => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setNewCourse({...newCourse, [type]: value});
  };

  const handleUpdateCourse = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateCourse(newCourse)).unwrap();

      setOpen(false);
      toast.success(t('courses.update.success', {course: course.name}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewCourse(copy(course));
  }, [course, open]);


  return (
    <Dialog
      components={{Root: 'form'}}
      onSubmit={handleUpdateCourse}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('courses.update.title', {course: course.name})}</DialogTitle>

      <DialogContent>
        <TextField
          required
          variant="standard"
          name="cb-course-name"
          value={newCourse.name}
          label={t('courses.fields.name')}
          onChange={e => setNewCourse({...newCourse, name: e.target.value})}
          InputProps={{endAdornment: <InputAdornment position="end" sx={{color: 'unset'}}>
            <FormGroup>
              <FormControlLabel
                label={t('courses.fields.speciality')}
                control={<Checkbox
                  checked={newCourse.speciality}
                  onChange={e => setNewCourse({...newCourse, speciality: e.target.checked})}
                />}
              />
            </FormGroup>
          </InputAdornment>}}
        />

        <TextField
          sx={{my: 2}}
          required fullWidth
          variant="standard"
          name="cb-course-link"
          value={newCourse.link}
          label={t('courses.fields.link')}
          onChange={e => setNewCourse({...newCourse, link: e.target.value})}
        />

        <Box className="MuiDialogContent-row" sx={{mb: 2}}>
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-course-year"
            value={newCourse.year}
            label={t('courses.fields.year')}
            InputProps={{autoComplete: Date.now().toString()}}
            onChange={e => handleChangeYearCredits(e, 'year')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: 5}}
          />
          <TextField
            required
            type="number"
            variant="standard"
            name="cb-course-credits"
            value={newCourse.credits}
            label={t('courses.fields.credits')}
            InputProps={{autoComplete: Date.now().toString()}}
            onChange={e => handleChangeYearCredits(e, 'credits')}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: 1}}
          />
        </Box>

        <TextField
          margin="dense"
          name="cb-course-description"
          required fullWidth multiline
          value={newCourse.description}
          label={t('courses.fields.description')}
          onChange={e => setNewCourse({...newCourse, description: e.target.value})}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!(newCourse.credits && newCourse.name && newCourse.link && newCourse.description)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateCourse;
