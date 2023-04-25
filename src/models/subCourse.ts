import { LevelKeys, TypeLearnKeys } from './variables';

export interface SubCoursePayload {
  id: number;
  level: LevelKeys;
  imageId: number;
  subjectId: number;
  type: TypeLearnKeys;
  price: number;
  minStudent: number;
  maxStudent: number;
  startDateExpected: string;
  endDateExpected: string;
  subCourseTile: string;
  numberOfSlot: number;
  isChosen?: boolean;
  timeInWeekRequests: SubCourseTimeInWeekPayload[];
}

export interface SubCourseTimeInWeekPayload {
  dayOfWeekId: number;
  slotId: number;
}
