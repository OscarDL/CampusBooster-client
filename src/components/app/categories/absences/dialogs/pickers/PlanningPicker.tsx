import dayjs from 'dayjs';
import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '../../../../../../store/store';
import { UserRoles } from '../../../../../../shared/types/user';
import { Planning } from '../../../../../../shared/types/planning';
import { getLoggedInAuthState } from '../../../../../../shared/functions';
import { Absence, AbsenceRequest } from '../../../../../../shared/types/absence';


type Props = {
  absence: Absence | AbsenceRequest,
  setAbsence: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  planning: Planning,
  value: any,
  label: string
};


const AbsencePlanningPicker: FC<Props> = ({absence, setAbsence}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { usersList } = useAppSelector(state => state.users);
  const { planningsList } = useAppSelector(state => state.plannings);

  const [planningOptions, setPlanningOptions] = useState<Option[]>([]);
  const isStudent = useMemo(() => user.role === UserRoles.Student, [user.role]);


  useEffect(() => {
    if (planningsList) {
      const selectedUser = usersList?.find(user => user.id === absence.userId);
      const selectedUserClassrooms = selectedUser?.UserHasClassrooms?.map(uhc => uhc.classroomId);

      const planningOptions: Option[] = planningsList
        .filter(planning => isStudent ? true : selectedUserClassrooms?.includes(planning.ClassroomHasCourse?.classroomId ?? 0))
        .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
        .map(planning => ({
          planning,
          value: planning.id,
          label: `${planning.ClassroomHasCourse?.Course?.name} (${dayjs(planning.date).format(t('global.date.mm-dd-yyyy'))})`
        }));

      setPlanningOptions(planningOptions);
    }
  }, [absence.userId, isStudent, planningsList, usersList, t]);


  return (
    <ReactSelect
      isSearchable
      menuPosition="fixed"
      options={planningOptions}
      isLoading={!planningsList}
      isDisabled={!planningsList}
      className="react-select-component"
      placeholder={t('absences.select_date')}
      classNamePrefix="react-select-component"
      onChange={planning => setAbsence({...absence, planningId: planning?.value})}
      value={planningOptions.find(option => option.planning.id === absence.planningId)}
    />
  );
};


export default AbsencePlanningPicker;
