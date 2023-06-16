import { ActivityType } from './activity';

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
  activities: ClassActivityPayload[];
}
interface ClassModule {
  id: number;
  name: string;
}
export interface ClassActivityPayload {
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
