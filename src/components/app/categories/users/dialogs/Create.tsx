import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import { azureDomainName } from '../../../../../shared/utils/values';
import { createUser } from '../../../../../store/features/users/slice';
import { getCampus } from '../../../../../store/features/campus/slice';
import { UserRequest, UserRoles } from '../../../../../shared/types/user';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getLoggedInAuthState, userHasHigherRole, userNeedsCampus } from '../../../../../shared/functions';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';

import UserCampusPicker from './CampusPicker';
import UserClassroomPicker from './ClassroomPicker';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newUserRequest = (): UserRequest => ({
  firstName: '', lastName: '', email: '', personalEmail: '',
  campusId: undefined, classrooms: [], role: UserRoles.Student,
  birthday: '', gender: undefined, address: '', promotion: undefined
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

  const handleCreateUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = {...newUser, email: `${newUser.email}@${azureDomainName}`};
      const res = await dispatch(createUser(user)).unwrap();

      // Update campus list with new campus manager for concerned campus
      if (res.user.role === UserRoles.CampusManager) {
        await dispatch(getCampus());
      }

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
      fullWidth maxWidth="sm"
      components={{Root: 'form'}}
      open={open} onSubmit={handleCreateUser}
      onClose={() => loading ? null : setOpen(false)}
    >
      <DialogTitle>{t('users.create.title')}</DialogTitle>

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
            placeholder={String(new Date().getFullYear())}
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
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
            required
            margin="dense"
            variant="standard"
            value={newUser.personalEmail}
            name="cb-user-personal-email"
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
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={loading} onClick={() => setOpen(false)}>
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
