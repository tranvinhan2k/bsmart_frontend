import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { ContentPayload, CoursePayload } from './type';
import {
  ActivityKeys,
  ClassStatusKeys,
  CourseStatusKeys,
  GenderKeys,
  ImageKeys,
  RoleKeys,
} from './variables';

export interface ResponseMentorCoursePayload {
  course: CoursePayload;
  classes: DetailCourseClassPayload[];
  content: ContentPayload;
}

export type GetAttendanceTimeSLotResponse = Partial<{
  timeTableResponse: {
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
  };
  attendanceResponses: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
    first: boolean;
    last: boolean;
    pageItemSize: number;
    pageSize: number;
    items: {
      id: number;
      student: {
        id: number;
        email: string;
        name: string;
      };
      attendance: boolean;
      note: string;
      hasTookAttendance: boolean;
    }[];
  };
}>;

export type GetActivityResponse = Partial<{
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  name: string;
  description: string;
  type: any;
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

export type ResponseUserClasses = Partial<{
  id: number;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  course: {
    id: number;
    code: string;
    name: string;
    description: number;
    subject: {
      id: number;
      code: number;
      name: number;
      categoryIds: number[];
    };
  };
  mentor: {
    id: number;
    name: string;
    email: number;
    introduce: number;
    mentorSkills: [
      {
        skillId: number;
        name: number;
        yearOfExperiences: number;
      }
    ];
    avatar: {
      id: number;
      name: number;
      url: number;
      status: boolean;
      type: 'COURSE';
    };
  };
  numberOfSlot: number;
  status: ClassStatusKeys;
  price: number;
  minStudent: number;
  maxStudent: number;
  image: {
    id: number;
    name: string;
    url: string;
    status: boolean;
    type: ImageKeys;
  };
  timeInWeeks: [
    {
      dayOfWeek: {
        id: number;
        name: number;
        code: string;
      };
      slot: {
        id: number;
        name: number;
        code: number;
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
    }
  ];
}>;

export type ResponseDetailClass = Partial<{
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  status: ClassStatusKeys;
  price: number;
  minStudent: number;
  maxStudent: number;
  numberOfSlot: number;
  hasReferralCode: boolean;
  numberReferralCode: number;
  classImage: {
    id: number;
    name: string;
    url: string;
    status: boolean;
    type: CourseStatusKeys;
  };
  mentor: {
    id: number;
    fullName: string;
    email: string;
    birthday: string;
    address: string;
    phone: string;
    status: boolean;
    gender: GenderKeys;
    roles: [
      {
        id: number;
        name: string;
        code: RoleKeys;
      }
    ];
    linkedinLink: string;
    facebookLink: string;
    website: string;
    userImages: [
      {
        id: number;
        name: string;
        url: string;
        status: boolean;
        type: CourseStatusKeys;
      }
    ];
    wallet: {
      id: number;
      balance: number;
      previous_balance: number;
      owner_id: number;
    };
    mentorProfile: {
      id: number;
      introduce: string;
      workingExperience: string;
      status: string;
      mentorSkills: {
        skillId: number;
        name: string;
        yearOfExperiences: number;
      }[];
    };
    isVerified: boolean;
  };
  activities: [
    {
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
    }
  ];
}>;

export type GetStudentList = Partial<{
  id: number;
  email: string;
  name: string;
}>;
