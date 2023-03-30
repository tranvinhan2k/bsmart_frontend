import { useQuery } from '@tanstack/react-query';
import dayOfWeeksApi from '~/api/dayOfWeeks';

export const useQueryGetAllDayInWeeks = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['dayInWeeks'],
    queryFn: () => dayOfWeeksApi.getAllDayInWeeks(),
  });
  return {
    error,
    dayInWeeks: data,
    isLoading,
  };
};
