import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import { updateUser } from '../../../../../store/features/users/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { User, UserRequest, UserRoles } from '../../../../../shared/types/user';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import UserCampusPicker from './CampusPicker';
import UserClassroomPicker from './ClassroomPicker';


type Props = {
  user: User,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const newUserRequest = (user: User): UserRequest => ({
  id: user.id, firstName: user.firstName, lastName: user.lastName,
  birthday: user.birthday, personalEmail: user.personalEmail, role: user.role,
  classrooms: (user.UserHasClassrooms ?? [])?.map(classroom => classroom.classroomId), campusId: user.campusId
});


const UpdateUser: FC<Props> = ({user, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector(state => state.users);

  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(newUserRequest(user));
  const userFullName = `${user.firstName} ${user.lastName}`;


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

  const handleUpdateUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await dispatch(updateUser(newUser)).unwrap();
      // manage added and removed classrooms from user

      setOpen(false);
      toast.success(t('users.fields.success' + (res.isNew ? '_new' : ''), {
        user: `${user.firstName} ${user.lastName}`
      }));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewUser(newUserRequest(user));
  }, [user, open]);


  return (
    <Dialog
      onSubmit={handleUpdateUser}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('users.update.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <Box className="MuiDialogContent-row">
          <FormControl>
            <InputLabel id="user-select-role">{t('users.fields.role')}</InputLabel>
            <Select
              onChange={e => handleChangeRole(e)}
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
        </Box>

        <Box sx={{my: 2}}>
          {user.role === UserRoles.CampusBoosterAdmin ? (
            // We have to do it this way because for some reason, setting the value
            // to undefined doesn't refresh the value shown in the component's view
            <ReactSelect isDisabled
              className="react-select-component"
              placeholder={t('users.select_campus')}
              classNamePrefix="react-select-component"
            />
          ) : (
            <UserCampusPicker user={newUser} setUser={setNewUser}/>
          )}
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
            value={user.firstName}
            name="cb-user-firstname"
            label={t('users.fields.first_name')}
            onChange={e => setNewUser({...newUser, firstName: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            value={user.lastName}
            name="cb-user-lastname"
            label={t('users.fields.last_name')}
            onChange={e => setNewUser({...newUser, lastName: e.target.value})}
          />
        </Box>

        <Box className="MuiDialogContent-row">
          <TextField
            required
            margin="dense"
            variant="standard"
            value={user.personalEmail}
            name="cb-user-personal-email"
            label={t('users.fields.personal_email')}
            onChange={e => setNewUser({...newUser, personalEmail: e.target.value})}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('users.fields.birthday')}
              value={user.birthday ? dayjs(user.birthday) : null}
              renderInput={(params) => <TextField {...params} sx={{mt: 1, mb: 0.5}} required variant="standard"/>}
              onChange={date => setNewUser({...newUser, birthday: date?.isValid() ? dayjs(date).toISOString() : ''})}
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
          disabled={!usersList || !(user.firstName && user.lastName && user.personalEmail && user.birthday && user.campusId)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateUser;
