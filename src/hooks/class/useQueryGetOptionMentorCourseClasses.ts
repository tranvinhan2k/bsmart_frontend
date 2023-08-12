import classApi from '~/api/class';
import { useCustomQuery } from '../custom/useCustomQuery';
import { OptionPayload } from '~/models';

export const useQueryGetOptionMentorCourseClasses = (id: number) => {
  const { data } = useCustomQuery(['mentor_course_classes'], () =>
    classApi.getMentorCourseCLasses({
      id,
      params: {
        q: '',
        page: 0,
      },
    })
  );

  const optionClasses: OptionPayload[] =
    data?.items
      .filter((item) => item.status === 'STARTING')
      .map((item) => ({
        id: item.id,
        label: `Lớp #${item.code}`,
        value: `${item.id}`,
      })) || [];

  return {
    optionClasses,
  };
};
