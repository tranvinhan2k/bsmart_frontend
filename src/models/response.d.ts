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
  NotificationType,
  QuestionTypeKeys,
  QuizKeys,
  QuizQuestionTypeKeys,
  RoleKeys,
} from './variables';
import { FeedbackQuestionType } from '~/constants/profile';

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
  classURL: string;
  maxStudent: number;
  numberOfSlot: number;
  hasReferralCode: boolean;
  numberReferralCode: number;
  image: Partial<{
    id: number;
    name: string;
    url: string;
    status: boolean;
    type: 'COURSE';
  }>;
  feedback: Partial<{
    id: number;
    name: string;
    type: FeedbackTypeKeys;
    totalClassUsed: number;
    isDefault: boolean;
    isFixed: boolean;
    questions: {
      id: number;
      question: string;
      answers: {
        id: number;
        answer: string;
      }[];
    }[];
    default: boolean;
    fixed: boolean;
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
    avatar: {
      id: number;
      name: string;
      url: string;
      status: boolean;
      type: 'COURSE';
    };
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
  averageRate: number;
  submissionCount: number;
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
    answerType: FeedbackQuestionTypeKeys;
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
  mentorRate: number;
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

export type GetAllNotificationResponse = Partial<{
  id: number;
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  viTitle: string;
  viContent: string;
  type: string;
  entity: NotificationType;
  entityId: number;
  read: boolean;
}>;

export type GetQuizQuestionResponse = Partial<{
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  mentorName: string;
  question: string;
  questionType: QuizQuestionTypeKeys;
  numberUsed: number;
  isShared: boolean;
  isDeleted: boolean;
  answers: {
    id: number;
    answer: string;
    isRight: boolean;
    key: string;
  }[];
}>;

export type GetFeedbackTemplateNotUse = Partial<{
  id: number;
  courseId: number;
  courseCode: string;
  code: string;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  numberOfSlot: number;
  status: string;
  price: number;
  minStudent: number;
  maxStudent: number;
  image: {
    id: number;
    name: string;
    url: string;
    status: true;
    type: string;
  };
  timeInWeeks: {
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
  }[];
}>;

export type GetDuplicateResponse = Partial<{
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  numberOfStudent: number;
  numberOfSlot: number;
  status: ClassStatusKeys;
  minStudent: number;
  maxStudent: number;
}>;

export type GetFeedbackCommentPayload = Partial<{
  submitBy: string;
  rate: number;
  comment: string;
  avatarUrl: string;
}>;

export type GetCourseFeedbackPayload = Partial<{
  submissionCount: number;
  averageRate: number;
  rateCount: any;
  submissions: {
    submitBy: string;
    rate: number;
    comment: string;
  }[];
}>;

export type GetTransactionsPayload = Partial<{
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  amount: number;
  status: string;
  statusName: string;
  type: string;
  typeName: string;
  beforeBalance: number;
  afterBalance: number;
  iconUrl: string;
}>;

export type ResponseGetMentorPayload = Partial<{
  id: number;
  introduce: string;
  workingExperience: string;
  status: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    birthday: string;
    address: string;
    phone: string;
    status: true;
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
      status: true;
      type: string;
    }[];
    wallet: {
      id: number;
      balance: number;
      previous_balance: number;
      owner_id: number;
    };
    mentorProfile: string;
    teachInformation: {
      numberOfCourse: number;
      numberOfClass: number;
      numberOfMember: number;
      scoreFeedback: number;
      numberOfFeedBack: number;
    };
    isVerified: true;
    finishedClassCount: number;
    timeSendRequest: string;
    count: number;
    verified: true;
  };
  mentorSkills: {
    skillId: number;
    name: string;
    yearOfExperiences: number;
  }[];
  averageRate: number;
  submissionCount: number;
}>;

export type ReferralCodeResponse = Partial<{
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  code: string;
  discountPercent: number;
  usageLimit: number;
  usageCount: number;
  expiredAt: string;
}>;

export type AiConvertResponse = Partial<{
  id: string;
  id_prob: string;
  name: string;
  name_prob: string;
  dob: string;
  dob_prob: string;
  sex: 'NAM' | 'NỮ';
  sex_prob: string;
  nationality: string;
  nationality_prob: string;
  home: string;
  home_prob: string;
  address: string;
  address_prob: string;
  doe: string;
  doe_prob: string;
  overall_score: string;
  address_entities: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  type_new: string;
  type: string;
}>;

export type AssignmentResultResponse = Partial<{
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  point: number;
  note: string;
  studentClass: {
    id: number;
    images: {
      id: number;
      name: string;
      url: string;
      status: true;
      type: 'DEFAULT';
    };
    email: string;
    name: string;
  };
  assignmentFiles: {
    id: number;
    url: string;
    uploadTime: string;
    fileType: 'SUBMIT';
    point: number;
    note: string;
    name: string;
    metadata: {
      url: string;
      name: string;
      extension: string;
      size: number;
    };
  }[];
}>;

export type StudentFeedbackResponse = Partial<{
  id: number;
  submitBy: {
    id: number;
    fullName: string;
    email: string;
    birthday: string;
    address: string;
    phone: string;
    status: true;
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
    userImages: {
      id: number;
      name: string;
      url: string;
      status: true;
      type: 'DEFAULT';
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
      mentorSkills: [
        {
          id: number;
          skillId: number;
          name: string;
          yearOfExperiences: number;
          status: true;
        }
      ];
      averageRate: number;
      submissionCount: number;
    };
    teachInformation: {
      numberOfCourse: number;
      numberOfClass: number;
      numberOfMember: number;
      scoreFeedback: number;
      numberOfFeedBack: number;
    };
    isVerified: true;
    timeSendRequest: string;
    count: number;
    provider: 'GOOGLE';
    learningInformation: {
      numberOfCourse: number;
      numberOfClass: number;
      numberOfFinishedClass: number;
    };
    verified: true;
  };
  mentorRate: number;
  courseRate: number;
  comment: string;
  questions: {
    id: number;
    question: string;
    answers: {
      id: number;
      answer: string;
      isChosen: boolean;
    }[];
  }[];
}>;
