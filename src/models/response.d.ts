import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { ContentPayload, CoursePayload } from './type';
import { ActivityKeys } from './variables';

export interface ResponseMentorCoursePayload {
  course: CoursePayload;
  classes: DetailCourseClassPayload[];
  content: ContentPayload;
}

export type GetActivityResponse = Partial<{
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  description: string;
  type: ActivityKeys;
  visible: boolean;
  detail: any;
  parentActivityId: number;
  authorizeClasses: number[];
  subActivities: {
    created: string;
    lastModified: string;
    createdBy: string;
    lastModifiedBy: string;
    id: number;
    name: string;
    type: ActivityKeys;
    visible: boolean;
    parentActivityId: number;
    subActivities: [];
  }[];
}>;

export type GetAllActivitiesResponse = Partial<{
  created: string | undefined;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  type: ActivityKeys;
  visible: boolean;
  parentActivityId: number;
  authorizeClasses: number[];
  subActivities: {
    created: string;
    lastModified: string;
    createdBy: string;
    lastModifiedBy: string;
    id: number;
    name: string;
    type: ActivityKeys;
    visible: boolean;
    parentActivityId: number;
    subActivities: [];
  }[];
}>[];

export type PostTimeTableResponse = Partial<{
  date: string;
  numberOfSlot: number;
  dayOfWeek: Partial<{
    id: number;
    name: string;
    code: string;
  }>;
  slot: Partial<{
    id: number;
    name: string;
    code: string;
    startTime: Partial<{
      hour: number;
      minute: number;
      second: number;
      nano: number;
    }>;
    endTime: Partial<{
      hour: number;
      minute: number;
      second: number;
      nano: number;
    }>;
  }>;
}>[];

export interface GetCoursePercentResponse {
  allowSendingApproval: boolean;
  percentComplete: number;
}
