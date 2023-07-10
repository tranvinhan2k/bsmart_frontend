import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { ContentPayload, CoursePayload } from './type';

export interface ResponseMentorCoursePayload {
  course: CoursePayload;
  classes: DetailCourseClassPayload[];
  content: ContentPayload;
}
