import { useQuery } from '@tanstack/react-query';
import mentorsApi from '~/api/mentors';

export const useQueryGetMentorByMentorId = (
  id: string | number | undefined,
  enabled: boolean
) => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['mentor', id],
    queryFn: () => mentorsApi.getMentorById(id as number),
    enabled,
  });

  return {
    error,
    mentor: data,
    isLoading,
  };
};
