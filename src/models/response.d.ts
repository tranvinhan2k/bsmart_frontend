import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { ContentPayload, CoursePayload } from './type';
import { ActivityKeys, RoleKeys } from './variables';

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

export type GetUserSchedule = Partial<{
  workingClass: Partial<{
    id: number;
    startDate: string;
    endDate: string;
    numberOfStudent: number;
    course: {
      id: number;
      code: string;
      name: string;
      description: string;
      subject: {
        id: number;
        code: string;
        name: string;
        categoryIds: number[];
      };
    };
    mentorName: string;
  }>;
  role?: RoleKeys;
  timeTableResponse: Partial<{
    id: number;
    date: string;
    classURL: string;
    slot: {
      id: number;
      name: string;
      code: string;
      startTime: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
      };
      endTime: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
      };
    };
  }>[];
}>[];
