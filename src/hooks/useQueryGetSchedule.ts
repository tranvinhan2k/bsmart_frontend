import accountApi from '~/api/users';
import { useCustomQuery } from './custom/useCustomQuery';

export const useQueryGetSchedule = () => {
  return useCustomQuery(['get_schedule'], accountApi.getUserSchedule);
};
