import classApi from '~/api/class';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetManagerClasses = (id: number) => {
  return useCustomQuery(['get_manager_classesF'], () =>
    classApi.getManagerFeedbackClass(id)
  );
};
