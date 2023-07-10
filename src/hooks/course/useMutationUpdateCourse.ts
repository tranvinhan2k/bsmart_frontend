import coursesApi from '~/api/courses';
import { useCustomMutation } from '../useCustomMutation';

export const useMutationUpdateCourse = () => {
  return useCustomMutation(['update_course'], coursesApi.updateCourse);
};
