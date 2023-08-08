import { Color, IconSize, MetricSize } from '~/assets/variables';

export type ColorKeys = keyof typeof Color;
export type IconSizeKeys = keyof typeof IconSize;
export type MetricSizeKeys = keyof typeof MetricSize;
export type TypeLearnKeys = 'ONLINE' | 'OFFLINE';
export type LevelKeys = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type RoleKeys = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type QuizKeys = 'PENDING' | 'DONE';
export type CRUDModes = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
export type ClassStatusKeys =
  | 'ALL'
  | 'REQUESTING'
  | 'WAITING'
  | 'EDITREQUEST'
  | 'REJECTED'
  | 'NOTSTART'
  | 'STARTING'
  | 'ENDED'
  | 'CANCEL';
export type CourseStatusKeys =
  | 'ALL'
  | 'REQUESTING'
  | 'WAITING'
  | 'EDITREQUEST'
  | 'REJECTED'
  | 'NOTSTART'
  | 'STARTING'
  | 'ENDED'
  | 'CANCEL';
export type QuestionTypeKeys = 'MULTIPLE_CHOICE' | 'FILL_THE_ANSWER';
export type FeedbackTypeKeys = 'COURSE';
export type FeedbackQuestionTypeKeys = 'ESSAY' | 'MULTIPLECHOICE';
export type PresentStatusKeys = 'WAIT' | 'PRESENT' | 'ABSENT';
export type GenderKeys = 'MALE' | 'FEMALE';
export type ImageKeys = 'AVATAR' | 'FRONTCI' | 'BACKCI' | 'COURSE';
export type CourseTypeKeys = 'PRIVATE' | 'PUBLIC';
export type ActivityKeys =
  | 'QUIZ'
  | 'SECTION'
  | 'LESSON'
  | 'ASSIGNMENT'
  | 'RESOURCE'
  | 'ANNOUNCEMENT';
export type QuizQuestionTypeKeys = 'SINGLE' | 'MULTIPLE';
export type NotificationType =
  | 'CLASS'
  | 'TRANSACTION'
  | 'COURSE'
  | 'MENTOR_PROFILE'
  | 'ACCOUNT';
export type MessageType = 'SYSTEM' | 'PERSONAL';
