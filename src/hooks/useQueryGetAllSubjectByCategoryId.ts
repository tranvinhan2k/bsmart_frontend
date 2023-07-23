import { useQuery } from '@tanstack/react-query';
import subjectsApi from '~/api/subjects';

export const useQueryGetAllSubjectByCategoryId = (categoryId: number) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['category_subjects'],
    queryFn: () => subjectsApi.getSubjectByCategoryId(categoryId),
    keepPreviousData: true,
  });
  return {
    subjects: data,
    error,
    isLoading,
    refetch,
  };
};
