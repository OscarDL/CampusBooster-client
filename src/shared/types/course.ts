export enum CourseType {
  Absence = 'absence',
  Exam = 'exam',
  Course = 'course',
  Today = 'today',
  Empty = ''
};

export type Course = {
  type: CourseType,
  name: string,
  title: string,
  credits: number,
  dates?: Date[]
};
