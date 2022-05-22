import { CourseType, FakeCourse, FakeProject } from '../types/course';


export const getFakeCredits = () => ([
  {
    subject: '4KWSP',
    optional: true,
    credits: 4,
    earned: 4
  },
  {
    subject: '4AZUR',
    optional: false,
    credits: 2,
    earned: 2
  },
  {
    subject: '4DOKR',
    optional: false,
    credits: 3,
    earned: 3
  },
  {
    subject: '4BINT',
    optional: false,
    credits: 4,
    earned: 4
  },
  {
    subject: '4CHGM',
    optional: false,
    credits: 2,
    earned: 2
  },
  {
    subject: '4SECU',
    optional: false,
    credits: 3,
    earned: 3
  },
  {
    subject: '4GDPR',
    optional: false,
    credits: 3,
    earned: 3
  },
  {
    subject: '4LIAL',
    optional: false,
    credits: 2,
    earned: 0
  },
  {
    subject: '4BOSS',
    optional: false,
    credits: 4,
    earned: 4
  },
  {
    subject: '4CCNA',
    optional: false,
    credits: 4,
    earned: 0
  },
  {
    subject: '4KUBE',
    optional: false,
    credits: 2,
    earned: 0
  },
  {
    subject: '4EDAP',
    optional: false,
    credits: 5,
    earned: 0
  },
  {
    subject: '4MLSP',
    optional: false,
    credits: 5,
    earned: 0
  },
  {
    subject: '4MLNS',
    optional: false,
    credits: 2,
    earned: 0
  },
  {
    subject: '4ENGL',
    optional: false,
    credits: 3,
    earned: 0
  },
  {
    subject: '4PROJ',
    optional: false,
    credits: 8,
    earned: 0
  },
  {
    subject: '4PINT',
    optional: true,
    credits: 2,
    earned: 2
  },
  {
    subject: '4FINT',
    optional: false,
    credits: 8,
    earned: 0
  },
  {
    subject: '4LIFE',
    optional: true,
    credits: 3,
    earned: 0
  },
  {
    subject: '4EXLP',
    optional: true,
    credits: 3,
    earned: 0
  }
]);


type FakeCalendar = {
  courses: FakeCourse[],
  projects: FakeProject[]
};

export const getFakeCalendar = (): FakeCalendar => ({
  courses: [{
    credits: 4,
    name: '4CCNA',
    type: CourseType.Course,
    title: 'Cisco Networking Academy',
    dates: [
      new Date(1647244800000),
      new Date(1647331200000),
      new Date(1647417600000)
    ]
  }, {
    credits: 2,
    name: '4KUBE',
    type: CourseType.Course,
    title: 'Kubernetes',
    dates: [
      new Date(1647849600000),
      new Date(1647936000000)
    ]
  }, {
    credits: 3,
    name: '4ENGL',
    type: CourseType.Oral,
    title: 'English courses',
    dates: [
      new Date(1648022400000)
    ]
  }, {
    credits: 2,
    name: '4LIAL',
    type: CourseType.Exam,
    title: 'Linear Algebra',
    dates: [
      new Date(1648710000000)
    ]
  }],

  projects: [{
    course: {
      credits: 4,
      name: '4BOSS',
      type: CourseType.Course,
      title: 'Become a business owner'
    },
    title: 'Create a local business',
    details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ducimus laudantium. Officiis quaerat perspiciatis veritatis rem obcaecati facere, esse beatae vel, quisquam a nisi est ducimus natus voluptate. Earum rem ducimus dolore culpa, laboriosam debitis nulla quidem exercitationem fugiat nobis alias, doloremque error! Eum dolorem ad tenetur quis provident libero nihil, eius explicabo, maiores ratione illum error, alias modi saepe asperiores nam deserunt inventore rem aliquam fugiat. Tempore quae perspiciatis fugit veniam, obcaecati, modi eos eaque corrupti laborum libero officia!',
    dateStart: new Date(1645916400000),
    dateEnd: new Date(1648504800000)
  }, {
    course: {
      credits: 5,
      name: '4EDAP',
      type: CourseType.Course,
      title: 'Analyse exploratoire de données'
    },
    title: 'Mini projet',
    details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ducimus laudantium. Officiis quaerat perspiciatis veritatis rem obcaecati facere, esse beatae vel, quisquam a nisi est ducimus natus voluptate. Earum rem ducimus dolore culpa, laboriosam debitis nulla quidem exercitationem fugiat nobis alias, doloremque error! Eum dolorem ad tenetur quis provident libero nihil, eius explicabo, maiores ratione illum error, alias modi saepe asperiores nam deserunt inventore rem aliquam fugiat. Tempore quae perspiciatis fugit veniam, obcaecati, modi eos eaque corrupti laborum libero officia!',
    dateStart: new Date(1651010400000),
    dateEnd: new Date(1656885540000)
  }]
});
