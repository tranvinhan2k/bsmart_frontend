import classApi from '~/api/class';
import { useCustomMutation } from '../useCustomMutation';

export const useUpdateClass = () => {
  const result = useCustomMutation(
    ['update_course_class'],
    classApi.updateClassForCourse
  );
  return result;
};
