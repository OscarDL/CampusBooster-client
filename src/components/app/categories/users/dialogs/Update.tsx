import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Zoom } from '@mui/material';

import { userEmailMatchesError } from './Create';
import { azureDomainName } from '../../../../../shared/utils/values';
import { updateUser } from '../../../../../store/features/users/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { User, UserRequest, UserRoles } from '../../../../../shared/types/user';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';
import { getLoggedInAuthState, userHasHigherRole, userShouldHaveNoCampusAssigned } from '../../../../../shared/functions';

import UserCampusPicker from './CampusPicker';
import UserClassroomPicker from './ClassroomPicker';
import userService from '../../../../../services/users';


type Props = {
  user: User,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newUserRequest = (user: User): UserRequest => ({
  id: user.id, role: user.role, firstName: user.firstName, lastName: user.lastName,
  birthday: user.birthday, email: user.email.split('@')[0], personalEmail: user.personalEmail,
  classrooms: (user.UserHasClassrooms ?? []).map(classroom => classroom.classroomId), campusId: user.campusId
});


const UpdateUser: FC<Props> = ({user: selectedUser, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { usersList } = useAppSelector(state => state.users);

  const [loading, setLoading] = useState(false);
  const [loadingResetPw, setLoadingResetPw] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [newUser, setNewUser] = useState(newUserRequest(selectedUser));
  const userFullName = `${selectedUser.firstName} ${selectedUser.lastName}`;
  const tooltip = `${t('users.update.reset_pw.tooltip_1', {user: userFullName})} ${t('users.update.reset_pw.tooltip_2')}`;


  const formIsComplete = () => (
    newUser.firstName &&
    newUser.lastName &&
    newUser.birthday &&
    newUser.email && !userEmailMatchesError(newUser.email) &&
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

  const handleResetPassword = async () => {
    setLoadingResetPw(true);

    try {
      await userService.resetUserPassword(selectedUser.id, selectedUser.personalEmail);

      setPasswordResetSent(true);
      toast.success(t('users.update.reset_pw.success', {user: `${selectedUser.firstName} ${selectedUser.lastName}`}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoadingResetPw(false);
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const request = {
        user: {
          ...newUser,
          email: `${newUser.email}@${azureDomainName}`
        },
        addClassrooms: newUser.classrooms.filter(classroom => (
          !(selectedUser.UserHasClassrooms ?? []).map(uhc => uhc.classroomId).includes(classroom)
        )),
        removeClassrooms: (selectedUser.UserHasClassrooms ?? [])
          .filter(uhc => !newUser.classrooms.includes(uhc.classroomId))
          .map(uhc => uhc.classroomId)
      };

      await dispatch(updateUser(request)).unwrap();

      setOpen(false);
      toast.success(t('users.update.success', {user: `${selectedUser.firstName} ${selectedUser.lastName}`}));
      if (newUser.personalEmail !== selectedUser.personalEmail) toast.success(t('users.update.reset_pw.success_auto'));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewUser(newUserRequest(selectedUser));
  }, [selectedUser, open]);


  return (
    <Dialog
      onSubmit={handleUpdateUser}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('users.update.title', {user: userFullName})}</DialogTitle>

      <DialogContent>
        <FormControl>
          <InputLabel id="user-select-role">{t('users.fields.role')}</InputLabel>
          <Select
            size="small" value={newUser.role}
            onChange={e => handleChangeRole(e)}
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
            name="cb-user-firstname"
            value={newUser.firstName}
            label={t('users.fields.first_name')}
            onChange={e => setNewUser({...newUser, firstName: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            name="cb-user-lastname"
            value={newUser.lastName}
            label={t('users.fields.last_name')}
            onChange={e => setNewUser({...newUser, lastName: e.target.value})}
          />
        </Box>

        <TextField
          required
          margin="dense"
          variant="standard"
          placeholder="john.doe"
          value={newUser.email ?? ''}
          name="cb-user-personal-email"
          label={t('users.fields.email')}
          error={userEmailMatchesError(newUser.email)}
          onChange={e => setNewUser({...newUser, email: e.target.value})}
          InputProps={{
            autoComplete: Date.now().toString(), // requires a unique value to be disabled
            endAdornment: <InputAdornment position="end">{'@' + azureDomainName}</InputAdornment>
          }}
        />

        <Box className="MuiDialogContent-row" sx={{mb: 2}}>
          <TextField
            margin="dense"
            variant="standard"
            name="cb-user-personal-email"
            value={newUser.personalEmail ?? ''}
            label={t('users.fields.personal_email')}
            required={newUser.role === UserRoles.Student}
            onChange={e => setNewUser({...newUser, personalEmail: e.target.value})}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('users.fields.birthday')}
              value={newUser.birthday ? dayjs(newUser.birthday) : null}
              renderInput={(params) => <TextField {...params} required variant="standard" sx={{mt: 1, mb: 0.5}}/>}
              onChange={date => setNewUser({...newUser, birthday: date?.isValid() ? dayjs(date).toISOString() : ''})}
            />
          </LocalizationProvider>
        </Box>

        <Box className="MuiDialogContent-row">
          {selectedUser.personalEmail ? (
            <MainDialogButton
              color="primary"
              variant="contained"
              sx={{width: '100%'}}
              loading={loadingResetPw}
              onClick={handleResetPassword}
              disabled={passwordResetSent || selectedUser.personalEmail !== newUser.personalEmail}
            >
              {t('users.update.reset_pw.button')}
            </MainDialogButton>
          ) : (
            <Tooltip TransitionComponent={Zoom} title={tooltip} placement="top">
              <Box><Button disabled color="primary" variant="contained" sx={{width: '100%'}}>
                {t('users.update.reset_pw.button')}
              </Button></Box>
            </Tooltip>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!usersList || !formIsComplete() || isEqual(newUserRequest(selectedUser), newUser)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default UpdateUser;
