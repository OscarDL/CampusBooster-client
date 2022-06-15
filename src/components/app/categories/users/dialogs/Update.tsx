import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useMemo, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Zoom } from '@mui/material';

import { userEmailMatchesError } from './Create';
import userService from '../../../../../services/users';
import { azureDomainName } from '../../../../../shared/utils/values';
import { updateUser } from '../../../../../store/features/users/slice';
import { getCampus } from '../../../../../store/features/campus/slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { User, UserRequest, UserRoles } from '../../../../../shared/types/user';
import { getLoggedInAuthState, userHasHigherRole, userNeedsCampus } from '../../../../../shared/functions';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import UserCampusPicker from './CampusPicker';
import UserClassroomPicker from './ClassroomPicker';


type Props = {
  user: User,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newUserRequest = (user: User): UserRequest => ({
  email: user.email.split('@')[0], personalEmail: user.personalEmail,
  id: user.id, role: user.role, firstName: user.firstName, lastName: user.lastName,
  gender: user.gender, address: user.address, promotion: user.promotion, birthday: user.birthday,
  classrooms: (user.UserHasClassrooms ?? []).map(classroom => classroom.classroomId), campusId: user.campusId
});


const UneditableUser: FC<Props> = ({user, open, setOpen}) => {
  const { t } = useTranslation();
  const userFullName = `${user.firstName} ${user.lastName}`;

  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('users.update.title', {user: userFullName})}</DialogTitle>

      <DialogContent sx={{mb: 2}}>
        <b>{t('users.update.uneditable', {user: userFullName})}</b>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton color="error" variant="contained" disabled>
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


const EditableUser: FC<Props> = ({user: selectedUser, open, setOpen}) => {
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

  const userEqual = useMemo(() => (
    isEqual(newUserRequest(selectedUser), newUser)
  ), [selectedUser, newUser]);


  const formIsComplete = () => (
    newUser.birthday &&
    newUser.lastName &&
    newUser.firstName &&
    newUser.personalEmail &&
    !userEmailMatchesError(newUser.email) &&
    (userNeedsCampus(newUser.role) ? newUser.campusId : true) &&
    (newUser.role === UserRoles.Student ? newUser.address : true) &&
    (newUser.role === UserRoles.Student ? newUser.promotion : true)
  );

  const handleChangeRole = (e: SelectChangeEvent<UserRoles>) => {
    const role = e.target.value as UserRoles;

    let campusId = newUser.campusId;
    let promotion = newUser.promotion;
    let classrooms = newUser.classrooms;

    if (role !== UserRoles.Student) {
      classrooms = [];
      promotion = undefined;

      if (role === UserRoles.CampusBoosterAdmin) {
        campusId = undefined;
      }
    }

    setNewUser({...newUser, role, campusId, classrooms, promotion});
  };

  const handleChangeGender = (e: SelectChangeEvent<string>) => {
    const gender = e.target.value;
    setNewUser({...newUser, gender: gender !== 'none' ? gender : undefined});
  };

  const handleChangePromotion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setNewUser({...newUser, promotion: value});
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

      const updatedUser = await dispatch(updateUser(request)).unwrap();

      // Update campus manager if any campus is concerned by this change
      const userWasCM = selectedUser.role === UserRoles.CampusManager;
      const userIsCM = updatedUser.role === UserRoles.CampusManager;

      if (
        selectedUser.campusId !== updatedUser.campusId ||
        (userWasCM && !userIsCM) || (!userWasCM && userIsCM)
      ) {
        dispatch(getCampus());
      }

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
        <Box className="MuiDialogContent-row">
          <FormControl>
            <InputLabel id="user-select-role">{t('users.fields.role')}</InputLabel>
            <Select
              size="small"
              value={newUser.role}
              labelId="user-select-role"
              onChange={handleChangeRole}
              label={t('users.fields.role')}
            >
              {Object.values(UserRoles).map(role => (
                !userHasHigherRole(user, role, true) ? (
                  <MenuItem key={role} value={role}>
                    {t(`users.${role.toLowerCase()}.title_role`)}
                  </MenuItem>
                ) : null
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="user-select-gender">{t('users.fields.gender.title')}</InputLabel>
            <Select
              size="small"
              labelId="user-select-gender"
              onChange={handleChangeGender}
              value={newUser.gender ?? 'none'}
              label={t('users.fields.gender.title')}
              
            >
              <MenuItem value="none">{t('users.fields.gender.none')}</MenuItem>
              <MenuItem value="M">{t('users.fields.gender.m')}</MenuItem>
              <MenuItem value="F">{t('users.fields.gender.f')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{my: 2}}>
          <UserCampusPicker user={newUser} setUser={setNewUser}/>
        </Box>

        <Box sx={{mb: 1}}>
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

        <Box className="MuiDialogContent-row">
          <TextField
            margin="dense"
            variant="standard"
            name="cb-user-address"
            value={newUser.address}
            label={t('users.fields.address')}
            required={newUser.role === UserRoles.Student}
            InputProps={{autoComplete: Date.now().toString()}}
            onChange={e => setNewUser({...newUser, address: e.target.value})}
          />
          <TextField
            type="number"
            margin="dense"
            variant="standard"
            name="cb-user-promotion"
            value={newUser.promotion ?? ''}
            onChange={handleChangePromotion}
            label={t('users.fields.promotion')}
            required={newUser.role === UserRoles.Student}
            disabled={newUser.role !== UserRoles.Student}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
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
          disabled={user.role === newUser.role && user.role !== UserRoles.CampusBoosterAdmin}
          InputProps={{
            autoComplete: Date.now().toString(), // requires a unique value to be disabled
            endAdornment: <InputAdornment position="end">{'@' + azureDomainName}</InputAdornment>
          }}
        />

        <Box className="MuiDialogContent-row" sx={{mb: 2}}>
          <TextField
            required
            margin="dense"
            variant="standard"
            name="cb-user-personal-email"
            value={newUser.personalEmail ?? ''}
            label={t('users.fields.personal_email')}
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
          disabled={!usersList || userEqual || !formIsComplete()}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


const UpdateUser: FC<Props> = ({user: selectedUser, open, setOpen}) => {
  const { user } = useAppSelector(getLoggedInAuthState);

  return (
    userHasHigherRole(user, selectedUser.role) ? (
      <UneditableUser user={selectedUser} open={open} setOpen={setOpen}/>
    ) : (
      <EditableUser user={selectedUser} open={open} setOpen={setOpen}/>
    )
  );
};


export default UpdateUser;
