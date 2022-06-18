import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Grade } from '../../../../shared/types/grade';
import { useAppSelector } from '../../../../store/store';
import { getCurrentUserYear, getLoggedInAuthState } from '../../../../shared/functions';

import Container from '../../../shared/container';


type Props = {
  tab: number;
};


const GradeSum: FC<Props> = ({tab}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(getLoggedInAuthState);
  const { gradesList } = useAppSelector(state => state.grades);

  const gradeYearSameAsTab = useCallback((grade: Grade) => (
    grade.ClassroomHasCourse?.Course?.year === tab
  ), [tab]);

  const userYearSameAsTab = useMemo(() => getCurrentUserYear(user) === tab, [user, tab]);
  const totalGrades = useMemo(() => userYearSameAsTab ? (
    user.UserHasClassrooms?.map(uhc => uhc.Classroom?.ClassroomHasCourses).flat().length
  ) : (
    gradesList?.filter(grade => gradeYearSameAsTab(grade)).length
  ), [gradesList, gradeYearSameAsTab, user, userYearSameAsTab]);


  return (
    <Container className="student-grades-summary">
      <p id="passed">
        {t('grades.footer.passed', {
          passed: gradesList?.filter(grade => gradeYearSameAsTab(grade) && grade.average >= 10).length,
          total: totalGrades
        })}
      </p>

      <b>&bull;</b>

      <p id="failed">
        {t('grades.footer.failed', {
          failed: gradesList?.filter(grade => gradeYearSameAsTab(grade) && grade.average < 10).length,
          total: totalGrades
        })}
      </p>
    </Container>
  );
};


export default GradeSum;
