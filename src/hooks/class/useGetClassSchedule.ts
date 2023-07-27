import accountApi from '~/api/users';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetClassSchedule = (id: number) => {
  return useCustomQuery(['class_detail_schedule'], () =>
    accountApi.getUserClassSchedule(id)
  );
};
