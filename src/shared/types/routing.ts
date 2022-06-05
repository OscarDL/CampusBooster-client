export enum AppCategories {
  Profile = 'profile',
  Home = 'home',
  Grades = 'grades',
  Courses = 'courses',
  Users = 'users',
  Planning = 'planning',
  Absences = 'absences',
  Contracts = 'contracts',
  Accounting = 'accounting',
  Tools = 'tools',
  Admin = 'admin'
};


// These keys should be lowercase
export enum AppRoutes {
  profile = '/profile',
  home = '/home',
  grades = '/grades',
  courses = '/courses',
  users = '/users',
  planning = '/planning',
  absences = '/absences',
  contracts = '/contracts',
  accounting = '/accounting',
  tools = '/tools',
  admin = '/admin/*'
};

// These keys should be lowercase
export enum AdminRoutes {
  bans = 'bans',
  campus = 'campus',
  teachers = 'teachers',
  planning = 'planning',
  classrooms = 'classrooms'
};
