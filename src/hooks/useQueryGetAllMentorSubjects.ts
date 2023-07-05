import { useQuery } from '@tanstack/react-query';
import subjectsApi from '~/api/subjects';

export const useQueryGetAllMentorSubjects = () => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['mentor_subjects'],
    queryFn: () => subjectsApi.getAllMentorSubjects(),
    keepPreviousData: true,
  });
  return {
    subjects: data,
    error,
    isLoading,
    refetch,
  };
};
