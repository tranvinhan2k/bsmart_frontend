import { useQuery } from '@tanstack/react-query';
import slotsApi from '~/api/slots';

export const useQueryGetAllSlots = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['slots'],
    queryFn: () => slotsApi.getAllSlots(),
  });
  return {
    error,
    slots: data,
    isLoading,
  };
};
