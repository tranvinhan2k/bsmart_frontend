import { ImagePayload } from '~/api/image';
import { LevelKeys, TypeLearnKeys } from './variables';
import { OptionPayload } from './common';

export interface SubCoursePayload {
  id: number;
  level: LevelKeys;
  imageId: ImagePayload | number;
  imageIndex: number;
  subjectId: OptionPayload | number;
  type: OptionPayload | number;
  price: number;
  minStudent: number;
  maxStudent: number;
  startDateExpected: string;
  endDateExpected: string;
  subCourseTile: string;
  numberOfSlot: number;
  isChosen?: boolean;
  timeInWeekRequests: SubCourseTimeInWeekPayload[];
  title: string;
  typeLearn: TypeLearnKeys;
  timeInWeeks: SubCourseTimeInWeekPayload[];
  purchase: any;
}

export interface SubCourseTimeInWeekPayload {
  dayInWeek: { label: string; id: string; code: string };
  slot: { label: string; id: string; code: string };
}
