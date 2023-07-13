import classApi from '~/api/class';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useQueryGetDetailUserCourse = (id: number) => {
  return useCustomQuery(['get_detail_course'], () =>
    classApi.getUserDetailCourse(id)
  );
};
