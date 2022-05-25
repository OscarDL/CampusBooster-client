import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import { azureDomainName } from '../../../../../shared/utils/values';
import { createUser } from '../../../../../store/features/users/slice';
import { UserRequest, UserRoles } from '../../../../../shared/types/user';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import UserCampusPicker from './CampusPicker';
import UserClassroomPicker from './ClassroomPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newUserRequest = (): UserRequest => ({
  firstName: '', lastName: '', email: '', personalEmail: '', birthday: '',
  campusId: undefined, classrooms: [], role: UserRoles.Student
});

export const userEmailMatchesError = (email: string) => (
  email.includes('@') || email.includes(' ')
);


const CreateUser: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector(state => state.users);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(newUserRequest());


  const formIsComplete = () => (
    user.firstName &&
    user.lastName &&
    user.birthday &&
    !userEmailMatchesError(user.email) &&
    (user.role === UserRoles.Student ? user.personalEmail : true) &&
    (user.role !== UserRoles.CampusBoosterAdmin ? user.campusId : true)
  );

  const handleChangeRole = (e: SelectChangeEvent<UserRoles>) => {
    const role = e.target.value as UserRoles;

    let campusId = user.campusId;
    let classrooms = user.classrooms;

    if (role !== UserRoles.Student) {
      classrooms = [];

      if (role === UserRoles.CampusBoosterAdmin) {
        campusId = undefined;
      }
    }

    setUser({...user, role, campusId, classrooms});
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newUser = {
        ...user,
        email: `${user.email}@${azureDomainName}`
      };
      const res = await dispatch(createUser(newUser)).unwrap();

      setOpen(false);
      setUser(newUserRequest());
      toast.success(t('users.create.success' + (res.isNew ? '_new' : ''), {
        user: `${user.firstName} ${user.lastName}`
      }));
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
        <FormControl>
          <InputLabel id="user-select-role">{t('users.fields.role')}</InputLabel>
          <Select
            onChange={handleChangeRole}
            size="small" value={user.role}
            labelId="user-select-role" label={t('users.fields.role')}
          >
            {Object.values(UserRoles).map(role => (
              <MenuItem key={role} value={role}>
                {t(`users.${role.toLowerCase()}.title_role`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{my: 2}}>
          <UserCampusPicker user={user} setUser={setUser}/>
        </Box>

        <Box sx={{mb: 2}}>
          <UserClassroomPicker user={user} setUser={setUser}/>
        </Box>

        <Box className="MuiDialogContent-row">
          <TextField
            required
            autoFocus
            margin="dense"
            variant="standard"
            value={user.firstName}
            name="cb-user-firstname"
            label={t('users.fields.first_name')}
            onChange={e => setUser({...user, firstName: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            value={user.lastName}
            name="cb-user-lastname"
            label={t('users.fields.last_name')}
            onChange={e => setUser({...user, lastName: e.target.value})}
          />
        </Box>

        <TextField
          required
          margin="dense"
          variant="standard"
          value={user.email}
          placeholder="john.doe"
          name="cb-user-personal-email"
          error={userEmailMatchesError(user.email)}
          onChange={e => setUser({...user, email: e.target.value})}
          label={t('users.fields.email')} InputLabelProps={{shrink: true}}
          InputProps={{
            autoComplete: Date.now().toString(), // requires a unique value to be disabled
            endAdornment: <InputAdornment position="end">{'@' + azureDomainName}</InputAdornment>
          }}
        />

        <Box className="MuiDialogContent-row">
          <TextField
            margin="dense"
            variant="standard"
            value={user.personalEmail}
            name="cb-user-personal-email"
            label={t('users.fields.personal_email')}
            required={user.role === UserRoles.Student}
            onChange={e => setUser({...user, personalEmail: e.target.value})}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('users.fields.birthday')}
              value={user.birthday ? dayjs(user.birthday) : null}
              onChange={date => setUser({...user, birthday: date?.isValid() ? dayjs(date).toISOString() : ''})}
              renderInput={(params) => <TextField {...params} required variant="standard" sx={{mt: 1, mb: 0.5}}/>}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!usersList || !user.email || !formIsComplete()}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateUser;
