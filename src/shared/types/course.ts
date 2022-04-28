export type CourseType = 'absence' | 'exam' | 'course' | 'entreprise' | '';

export type Course = {
  type: CourseType,
  name: string,
  title: string,
  credits: number,
  dates?: Date[]
};
