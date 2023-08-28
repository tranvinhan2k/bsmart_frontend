import coursesApi from '~/api/courses';
import { useCustomMutation } from './custom/useCustomMutation';

export const useChangeStatusCourse = () => {
  return useCustomMutation(
    ['change_status_course'],
    coursesApi.changeCourseStatus
  );
};
