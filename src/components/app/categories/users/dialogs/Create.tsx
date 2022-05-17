import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { createUser } from '../../../../../store/features/users/slice';
import { UserRequest, UserRoles } from '../../../../../shared/types/user';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import UserCampusPicker from './CampusPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newUserRequest = (): UserRequest => ({
  firstName: '', lastName: '', email: '', personalEmail: '',
  birthday: '', campusId: 0, section: 1, role: UserRoles.Student
});


const CreateTool: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector(state => state.users);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(newUserRequest());


  const handleCreateUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createUser(user)).unwrap();

      setOpen(false);
      setUser(newUserRequest());
      toast.success(t('users.create.success', {user: `${user.firstName} ${user.lastName}`}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  return (
    <Dialog
      onSubmit={handleCreateUser}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('users.create.title')}</DialogTitle>

      <DialogContent>
        <Box className="MuiDialogContent-row" sx={{mt: 2, mb: 1}}>
          <FormControl>
            <InputLabel id="user-select-role">{t('users.create.role')}</InputLabel>
            <Select
              size="small" value={user.role}
              labelId="user-select-role" label={t('users.create.role')}
              onChange={e => setUser({...user, role: e.target.value as UserRoles})}
            >
              {Object.values(UserRoles).map(role => (
                <MenuItem key={role} value={role}>
                  {t(`users.${role.toLowerCase()}.title__role`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="user-select-section">{t('users.create.section')}</InputLabel>
            <Select
              size="small" value={user.section}
              labelId="user-select-section" label={t('users.create.section')}
              onChange={e => setUser({...user, section: +e.target.value})}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="MuiDialogContent-row" sx={{mt: 1}}>
          <Box sx={{mb: 1}}>
            <UserCampusPicker user={user} setUser={setUser}/>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('users.create.birthday')}
              value={user.birthday ? dayjs(user.birthday) : null}
              renderInput={(params) => <TextField {...params} sx={{mb: 1}} required size="small"/>}
              onChange={date => setUser({...user, birthday: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
        </LocalizationProvider>
        </Box>

        <Box className="MuiDialogContent-row">
          <TextField
            required
            autoFocus
            margin="dense"
            variant="standard"
            value={user.firstName}
            name="cb-user-firstname"
            label={t('users.create.first_name')}
            onChange={e => setUser({...user, firstName: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            value={user.lastName}
            name="cb-user-lastname"
            label={t('users.create.last_name')}
            onChange={e => setUser({...user, lastName: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row">
          <TextField
            required
            margin="dense"
            variant="standard"
            value={user.email}
            name="cb-user-email"
            label={t('users.create.email')}
            onChange={e => setUser({...user, email: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            value={user.personalEmail}
            name="cb-user-personal-email"
            label={t('users.create.personal_email')}
            onChange={e => setUser({...user, personalEmail: e.target.value})}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!usersList || !(user.firstName && user.lastName && user.email && user.personalEmail && user.birthday && user.campusId && user.section)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateTool;
