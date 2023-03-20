import { useQuery } from '@tanstack/react-query';
import accountApi from '~/api/users';

export const useQueryGetMentorByMentorId = (
  id: string | number | undefined,
  enabled: boolean
) => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['mentor', id],
    queryFn: () => accountApi.getMentorData(`${id}`),
    enabled,
  });
  return {
    error,
    mentor: data,
    isLoading,
  };
};
