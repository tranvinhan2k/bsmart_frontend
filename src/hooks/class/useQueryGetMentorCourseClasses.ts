import classApi from '~/api/class';
import { useCustomQuery } from '../useCustomQuery';
import { PagingRequestPayload } from '~/models';

export const useQueryGetMentorCourseClasses = (props: {
  id: number;
  params: PagingRequestPayload;
}) => {
  return useCustomQuery(['mentor_course_classes'], () =>
    classApi.getMentorCourseCLasses(props)
  );
};
