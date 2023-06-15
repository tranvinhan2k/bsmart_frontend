export interface ClassDetailsPayload {
  id: number;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  subCourseName: string;
  mentorName: string;
  classSectionList: ClassSectionList[];
}

interface ClassSectionList {
  id: number;
  name: string;
  classModules: ClassModule[];
  activities: ClassActivity[];
}
interface ClassModule {
  id: number;
  name: string;
}
interface ClassActivity {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  isVisible: boolean;
  type: ActivityType;
  activityDetail: ActivityDetail;
}
interface ActivityType {
  id: number;
  name: ActivityTypeName;
  code: ActivityTypeCode;
}
export const enum ActivityTypeName {
  ASSIGNMENT = 'assignment',
  QUIZ = 'quiz',
  ANNOUNCEMENT = 'announcement',
}
export const enum ActivityTypeCode {
  ASSIGNMENT = 'ASSIGNMENT',
  QUIZ = 'QUIZ',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}
interface ActivityDetail {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}
