import { Grade } from './grade';
import { Planning } from './planning';


export type Summary = {
  campus: number,
  courses: number,
  students: number,
  annualCredits?: number,
  latestGrades?: Grade[],
  upcomingCourses?: Planning[]
};
