import accountApi from '~/api/users';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useQueryGetDetailSchedule = (classId: number) => {
  const { data, error, isLoading } = useCustomQuery(
    ['get_detail_schedule'],
    () => accountApi.getClassAttendance(classId)
  );
  return {
    error,
    isLoading,
    classTimeSlots: data,
  };
};
