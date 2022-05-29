import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

import { Campus } from '../../../../../../shared/types/campus';
import { useAppSelector } from '../../../../../../store/store';
import { UserRoles } from '../../../../../../shared/types/user';
import { getLoggedInAuthState } from '../../../../../../shared/functions';
import { Classroom, ClassroomRequest } from '../../../../../../shared/types/classroom';


type Props = {
  classroom: Classroom | ClassroomRequest,
  setClassroom: React.Dispatch<React.SetStateAction<any>>
};

type Option = {
  campus: Campus,
  label: string,
  value: number
};


const CampusPicker: FC<Props> = ({classroom, setClassroom}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { campusList } = useAppSelector(state => state.campus);

  const [campusOptions, setCampusOptions] = useState<Option[]>([]);


  useEffect(() => {
    if (campusList) {
      const campusOptions: Option[] = campusList
        .filter(campus => (
          user.role === UserRoles.CampusBoosterAdmin ? true : user.campusId === campus.id
        ))
        .map(campus => ({
          campus,
          value: campus.id,
          label: campus.name
        }));

      setCampusOptions(campusOptions);
    }
  }, [campusList, user]);


  return (
    <ReactSelect
      isClearable
      isSearchable
      options={campusOptions}
      isLoading={!campusList}
      isDisabled={!campusList}
      className="react-select-component"
      classNamePrefix="react-select-component"
      placeholder={t('admin.classrooms.select_campus')}
      value={campusOptions.find(option => option.campus.id === classroom.campusId)}
      onChange={option => setClassroom({...classroom, campusId: option?.campus?.id ?? undefined})}
    />
  );
};


export default CampusPicker;
