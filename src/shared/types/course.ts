export enum CourseType {
  Course = 'course',
  Today = 'today',
  Exam = 'exam',
  Oral = 'oral',
  Empty = ''
};

export type Course = {
  id: number,
  name: string,
  link: string,
  year: number,
  credits: number,
  description: string,
  speciality: boolean
};


export type FakeCourse = {
  type: CourseType,
  name: string,
  title: string,
  credits: number,
  dates?: Date[]
};

export type FakeProject = {
  title: string,
  course: FakeCourse,
  details: string,
  dateStart: Date,
  dateEnd: Date
};
