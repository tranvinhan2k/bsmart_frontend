import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import subjectApi from '~/api/subjects';
import { useCustomMutation } from './custom/useCustomMutation';

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

  const addSubjectMutation = useCustomMutation([key], subjectApi.createSubject);

  const updateSubjectMutation = useCustomMutation(
    [key],
    subjectApi.updateSubject
  );
  const deleteSubjectMutation = useCustomMutation(
    [key],
    subjectApi.deleteSubject
  );
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
