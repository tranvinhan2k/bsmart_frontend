import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
// eslint-disable-next-line import/no-cycle
import { ContentPayload, CoursePayload } from './type';

import {
  ActivityKeys,
  ClassStatusKeys,
  CourseStatusKeys,
  FeedbackTypeKeys,
  GenderKeys,
  ImageKeys,
  LevelKeys,
  QuizKeys,
  QuizQuestionTypeKeys,
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
    tookAttendance: boolean;
    present: boolean;
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
        images: {
          id: number;
          name: string;
          url: string;
          status: boolean;
          type: string;
        };
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
  fixed: boolean;
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
    code: string;
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
    mentor: {
      id: number;
      name: string;
      email: string;
      introduce: string;
      mentorSkills: [
        {
          skillId: number;
          name: string;
          yearOfExperiences: number;
        }
      ];
      avatar: {
        id: number;
        name: string;
        url: string;
        status: boolean;
        type: ImageKeys;
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
          name: string;
          code: string;
        };
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
      }
    ];
  }>;
  role: 'ANONYMOUS';
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
    tookAttendance: boolean;
    present: boolean;
  }>[];
}>[];

export type ResponseUserClasses = Partial<{
  id: number;
  code: string;
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
  mentor: {
    id: number;
    name: string;
    email: string;
    introduce: string;
    mentorSkills: [
      {
        skillId: number;
        name: string;
        yearOfExperiences: number;
      }
    ];
    avatar: {
      id: number;
      name: string;
      url: string;
      status: boolean;
      type: ImageKeys;
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
        name: string;
        code: string;
      };
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
  classImage: Partial<{
    id: number;
    name: string;
    url: string;
    status: boolean;
    type: 'COURSE';
  }>;
  mentor: Partial<{
    id: number;
    fullName: string;
    email: string;
    birthday: string;
    address: string;
    phone: string;
    status: boolean;
    gender: 'MALE';
    roles: [
      {
        id: number;
        name: string;
        code: 'ANONYMOUS';
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
        type: 'COURSE';
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
      status: 'REQUESTING';
      mentorSkills: [
        {
          skillId: number;
          name: string;
          yearOfExperiences: number;
        }
      ];
    };
    isVerified: boolean;
  }>;
  activities: Partial<{
    created: string;
    lastModified: string;
    createdBy: string;
    lastModifiedBy: string;
    id: number;
    name: string;
    type: 'QUIZ';
    visible: boolean;
    parentActivityId: number;
    subActivities: [];
  }>[];
  timeInWeeks: Partial<{
    dayOfWeek: {
      id: number;
      name: string;
      code: 'SUNDAY';
    };
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
  course: Partial<{
    id: number;
    code: string;
    name: string;
    description: string;
    subject: {
      id: number;
      code: string;
      name: string;
      categoryIds: [0];
    };
  }>;
  numberOfCurrentStudent: number;
  progress: Partial<{
    currentSlot: number;
    percentage: number;
  }>;
}>;

export type GetStudentList = Partial<{
  id: number;
  images: {
    id: number;
    name: string;
    url: string;
    status: boolean;
    type: ImageKeys;
  };
  email: string;
  name: string;
}>;

export type PostDoQuizResponse = Partial<{
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  time: number;
  questionCount: number;
  status: QuizKeys;
  defaultPoint: number;
  isSuffleQuestion: boolean;
  isAllowReview: boolean;
  allowReviewAfterMin: number;
  password: string;
  activityId: number;
  quizQuestions: Partial<{
    id: number;
    question: string;
    type: QuizQuestionTypeKeys;
    answers: Partial<{
      id: number;
      answer: string;
    }>[];
  }>[];
}>;

export type GetReviewQuizResponse = Partial<{
  id: number;
  quizId: number;
  correctNumber: number;
  incorrectNumber: number;
  point: number;
  status: QuizKeys;
  questions: Partial<{
    id: number;
    question: string;
    type: QuizQuestionTypeKeys;
    answers: Partial<{
      id: number;
      answer: string;
      isRight: boolean;
      isChosen: boolean;
    }>[];
  }>[];
}>;

export type GetMentorQuizzesResponse = Partial<{
  id: number;
  submitBy: {
    id: number;
    name: string;
  };
  submitAt: string;
  point: number;
  correctNumber: number;
  totalQuestion: number;
  status: QuizKeys;
}>;

export type GetResultResponse = Partial<{
  id: number;
  submitBy: {
    id: number;
    name: string;
  };
  submitAt: string;
  point: number;
  correctNumber: number;
  totalQuestion: number;
  status: QuizKeys;
}>;

export type GetAllCoursesResponse = Partial<{
  id: number;
  images: Partial<{
    id: number;
    name: string;
    url: string;
    status: boolean;
    type: 'DEFAULT';
  }>[];
  courseCode: string;
  courseName: string;
  categoryResponse: Partial<{
    id: number;
    code: string;
    name: string;
  }>;
  subjectResponse: Partial<{
    id: number;
    code: string;
    name: string;
    categoryIds: number[];
  }>;
  level: LevelKeys;
  status: CourseStatusKeys;
  courseDescription: string;
  totalClass: number;
  mentorName: string[];
}>;

type GetAllFeedbackTemplate = Partial<{
  id: number;
  name: string;
  type: FeedbackTypeKeys;
  isDefault: boolean;
  isFixed: boolean;
  questions: {
    question: string;
    answers: {
      answer: string;
    }[];
  }[];
}>;

type GetMentorListQuiz = Partial<{
  id: number;
  submitBy: {
    id: number;
    name: string;
  };
  submitAt: string;
  point: number;
  correctNumber: number;
  totalQuestion: number;
  status: QuizKeys;
}>;

export type GetAllMentorAssignment = Partial<{
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  point: number;
  note: string;
  studentClass: Partial<{
    id: number;
    images: {
      id: number;
      name: string;
      url: string;
      status: boolean;
      type: 'DEFAULT';
    };
    email: string;
    name: string;
  }>;
  assignmentFiles: Partial<{
    id: number;
    url: string;
    uploadTime: string;
    fileType: string;
    point: number;
    note: string;
    name: string;
    metadata: {
      url: string;
      name: string;
      extension: string;
      size: number;
    };
  }>[];
}>;

export type GetAllMentorFeedback = Partial<{
  id: number;
  name: string;
  submitBy: {
    id: number;
    fullName: string;
    email: string;
    birthday: string;
    address: string;
    phone: string;
    status: boolean;
    gender: string;
    roles: {
      id: number;
      name: string;
      code: string;
    }[];
    linkedinLink: string;
    facebookLink: string;
    website: string;
    userImages: {
      id: number;
      name: string;
      url: string;
      status: boolean;
      type: string;
    }[];
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
      status: 'REQUESTING';
      user: string;
      mentorSkills: {
        skillId: number;
        name: string;
        yearOfExperiences: number;
      }[];
    };
    teachInformation: {
      numberOfCourse: number;
      numberOfClass: number;
      numberOfMember: number;
      scoreFeedback: number;
      numberOfFeedBack: number;
    };
    isVerified: boolean;
    verified: boolean;
  };
  rate: number;
  comment: string;
  questions: [
    {
      question: string;
      answers: [
        {
          answer: string;
          isChosen: boolean;
        }
      ];
    }
  ];
}>;
