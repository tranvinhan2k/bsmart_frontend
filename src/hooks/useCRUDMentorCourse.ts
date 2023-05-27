import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import coursesApi from '~/api/courses';

export default function useCRUDMentorCourse(id: number) {
  const key = 'course_detail';
  const queryClient = useQueryClient();
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key],
    queryFn: () => coursesApi.getDetailCourse(id),
    keepPreviousData: true,
  });

  const requestCourseMutation = useMutation({
    mutationKey: [key],
    mutationFn: coursesApi.requestSubCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  const deleteCourseMutation = useMutation({
    mutationKey: [key],
    mutationFn: coursesApi.deleteSubCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  const updateCourseMutation = useMutation({
    mutationKey: [key],
    mutationFn: coursesApi.updateSubCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  return {
    error,
    isLoading,
    data,
    refetch,
    deleteCourseMutation,
    requestCourseMutation,
    updateCourseMutation,
  };
}
