import classApi from '~/api/class';
import { useCustomMutation } from '../custom/useCustomMutation';
import timetableApi from '~/api/timetable';

export const useCreateCourseClass = () => {
  const { mutateAsync: handleCreateClass } = useCustomMutation(
    ['create_course_class'],
    classApi.addClassForCourse
  );
  const { mutateAsync: handleGetTimetable } = useCustomMutation(
    ['get_timetable'],
    timetableApi.getTimetable
  );

  return {
    handleCreateClass,
    handleGetTimetable,
  };
};
