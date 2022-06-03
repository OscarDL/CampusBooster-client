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
import { getLoggedInAuthState, userHasHigherRole, userShouldHaveNoCampusAssigned } from '../../../../../shared/functions';

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
  const { user } = useAppSelector(getLoggedInAuthState);
  const { usersList } = useAppSelector(state => state.users);

  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(newUserRequest());


  const formIsComplete = () => (
    newUser.firstName &&
    newUser.lastName &&
    newUser.birthday &&
    !userEmailMatchesError(newUser.email) &&
    (newUser.role === UserRoles.Student ? newUser.personalEmail : true) &&
    (!userShouldHaveNoCampusAssigned(newUser.role) ? newUser.campusId : true)
  );

  const handleChangeRole = (e: SelectChangeEvent<UserRoles>) => {
    const role = e.target.value as UserRoles;

    let campusId = newUser.campusId;
    let classrooms = newUser.classrooms;

    if (role !== UserRoles.Student) {
      classrooms = [];

      if (role === UserRoles.CampusBoosterAdmin) {
        campusId = undefined;
      }
    }

    setNewUser({...newUser, role, campusId, classrooms});
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = {...newUser, email: `${newUser.email}@${azureDomainName}`};
      const res = await dispatch(createUser(user)).unwrap();

      setOpen(false);
      setNewUser(newUserRequest());
      toast.success(t('users.create.success' + (res.isNew ? '_new' : ''), {
        user: `${newUser.firstName} ${newUser.lastName}`
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
            size="small"
            value={newUser.role}
            onChange={handleChangeRole}
            labelId="user-select-role" label={t('users.fields.role')}
          >
            {Object.values(UserRoles).map(role => (
              !userHasHigherRole(user, role) ? (
                <MenuItem key={role} value={role}>
                  {t(`users.${role.toLowerCase()}.title_role`)}
                </MenuItem>
              ) : null
            ))}
          </Select>
        </FormControl>

        <Box sx={{my: 2}}>
          <UserCampusPicker user={newUser} setUser={setNewUser}/>
        </Box>

        <Box sx={{mb: 2}}>
          <UserClassroomPicker user={newUser} setUser={setNewUser}/>
        </Box>

        <Box className="MuiDialogContent-row">
          <TextField
            required
            autoFocus
            margin="dense"
            variant="standard"
            value={newUser.firstName}
            name="cb-user-firstname"
            label={t('users.fields.first_name')}
            onChange={e => setNewUser({...newUser, firstName: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            value={newUser.lastName}
            name="cb-user-lastname"
            label={t('users.fields.last_name')}
            onChange={e => setNewUser({...newUser, lastName: e.target.value})}
          />
        </Box>

        <TextField
          required
          margin="dense"
          variant="standard"
          value={newUser.email}
          placeholder="john.doe"
          name="cb-user-personal-email"
          error={userEmailMatchesError(newUser.email)}
          onChange={e => setNewUser({...newUser, email: e.target.value})}
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
            value={newUser.personalEmail}
            name="cb-user-personal-email"
            label={t('users.fields.personal_email')}
            required={newUser.role === UserRoles.Student}
            onChange={e => setNewUser({...newUser, personalEmail: e.target.value})}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('users.fields.birthday')}
              value={newUser.birthday ? dayjs(newUser.birthday) : null}
              onChange={date => setNewUser({...newUser, birthday: date?.isValid() ? dayjs(date).toISOString() : ''})}
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
          disabled={!usersList || !newUser.email || !formIsComplete()}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateUser;
