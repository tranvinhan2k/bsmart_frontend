import classApi from '~/api/class';
import { useCustomQuery } from '../useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useQueryGetMentorCourseClasses = (props: {
  id: number;
  params: PagingFilterRequest;
}) => {
  return useCustomQuery(['mentor_course_classes'], () =>
    classApi.getMentorCourseCLasses(props)
  );
};
