import { FC } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { OpenInNewRounded } from '@mui/icons-material';

import { Grade } from '../../../../../shared/types/grade';


type Props = {
  grade: Grade
};


const GradesLine: FC<Props> = ({grade}) => {
  const { t } = useTranslation();

  const course = grade.ClassroomHasCourse?.Course;


  return (
    <div className={`${grade.average < 10 ? 'failed' : 'passed'}-color`}>
      <span className="grades__item__course">
        {course?.name}
        {t('global.colon')}
        &nbsp;{grade.average} / 20
      </span>

      <span className="grades__item__title">
        &nbsp;&ndash; {grade.comment}
      </span>

      <span className="grades__item__more">
        <Button color="primary" onClick={() => window.open(course?.link, '_blank')}>
          <OpenInNewRounded/>
        </Button>
      </span>
    </div>
  );
};


export default GradesLine;
