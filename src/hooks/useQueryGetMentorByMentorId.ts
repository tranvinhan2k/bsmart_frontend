import { useQuery } from '@tanstack/react-query';
import mentorProfileApi from '~/api/mentorProfiles';
import accountApi from '~/api/users';

export const useQueryGetMentorByMentorId = (
  id: string | number | undefined,
  enabled: boolean
) => {
  const { error, data, isLoading} = useQuery({
    queryKey: ['mentor', id],
    queryFn: () => mentorProfileApi.getMentorById(id as number),
    enabled,
  });

  return {
    error,
    mentor: data,
    isLoading,
  };
};
