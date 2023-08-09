import { ActivityType } from './activity';
import { ImageType, TimeInWeeks } from './common';

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

export interface ClassGetDetailsPayload {
  id?: number;
}

export interface ClassCreateClassSectionPayload {
  id: number;
  data: {
    name: string;
  };
}
export interface ClassUpdateClassSectionPayload {
  id: number;
  classSectionId: number;
  data: {
    name: string;
  };
}
export interface ClassDeleteClassSectionPayload {
  id: number;
  classSectionId: number;
}

export interface ManagedClass {
  id: number;
  courseId: number;
  code: string;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  numberOfSlot: number;
  status: string;
  price: number;
  minStudent: number;
  maxStudent: number;
  image: ImageType;
  timeInWeeks: TimeInWeeks[];
}

export interface Slot {
  id: number;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
}
