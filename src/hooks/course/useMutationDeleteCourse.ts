import coursesApi from '~/api/courses';
import { useCustomMutation } from '../useCustomMutation';

export const useMutationDeleteCourse = () => {
  return useCustomMutation(['delete_course'], coursesApi.deleteCourse);
};
