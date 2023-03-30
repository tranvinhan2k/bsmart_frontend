import { useQuery } from '@tanstack/react-query';
import mentorProfileApi from '~/api/mentorProfiles';

export const useQueryGetAllMentors = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['mentors'],
    queryFn: mentorProfileApi.getAllMentor,
  });
  return {
    error,
    mentors: data,
    isLoading,
  };
};
