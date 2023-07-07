import classApi from '~/api/class';
import { useCustomMutation } from '../useCustomMutation';

export const useCreateCourseClass = () => {
  const result = useCustomMutation(
    ['create_course_class'],
    classApi.addClassForCourse
  );
  return result;
};
