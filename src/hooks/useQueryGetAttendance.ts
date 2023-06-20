import { useQuery } from '@tanstack/react-query';
import attendanceApi from '~/api/attendances';

export const useQueryGetAttendance = (timetableId: string) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['banks'],
    queryFn: () =>
      attendanceApi.getAttendanceTimetable(parseInt(timetableId, 10)),
    keepPreviousData: true,
  });
  return {
    attendances: data,
    error,
    isLoading,
    refetch,
  };
};
