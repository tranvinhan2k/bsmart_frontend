import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import subjectApi from '~/api/subjects';

export interface RequestSubjectPayload {
  code: string;
  name: string;
}

export const useCRUDSubjects = () => {
  const key = 'subject';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['subject'],
    queryFn: () => subjectApi.getAllSubjectsAllProp(),
  });

  const addSubjectMutation = useMutation({
    mutationKey: [key],
    mutationFn: subjectApi.createSubject,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);

  const updateSubjectMutation = useMutation({
    mutationKey: [key],
    mutationFn: subjectApi.updateSubject,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  const deleteSubjectMutation = useMutation({
    mutationKey: [key],
    mutationFn: subjectApi.deleteSubject,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  const getOneSubjectMutation = useMutation({
    mutationKey: [key],
    mutationFn: subjectApi.getSubject,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  return {
    error,
    subjects: data,
    isLoading:
      isLoading ||
      addSubjectMutation.isLoading ||
      deleteSubjectMutation.isLoading ||
      updateSubjectMutation.isLoading ||
      getOneSubjectMutation.isLoading,
    refetch,
    addSubjectMutation,
    deleteSubjectMutation,
    updateSubjectMutation,
    getOneSubjectMutation,
  };
};
