import { useQuery } from '@tanstack/react-query';
import subjectsApi from '~/api/subjects';

export const useQueryGetAllSubjects = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectsApi.getAllSubjects(),
  });
  return {
    error,
    subjects: data,
    isLoading,
  };
};
