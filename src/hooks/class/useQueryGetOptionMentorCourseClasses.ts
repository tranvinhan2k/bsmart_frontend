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
        size: 1000000000,
      },
    })
  );

  const optionClasses: OptionPayload[] =
    data?.items?.map((item) => ({
      id: item.id,
      label: `Lớp #${item.code}`,
      value: `${item.id}`,
    })) || [];

  return {
    optionClasses,
  };
};
