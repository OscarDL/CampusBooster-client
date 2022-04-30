export type CourseType = 'absence' | 'exam' | 'course' | 'today' | '';

export type Course = {
  type: CourseType,
  name: string,
  title: string,
  credits: number,
  dates?: Date[]
};
