import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import classApi from '~/api/class';

export interface UseManageClassPayload {
  id?: number;
}

export const useManageClass = ({ id }: UseManageClassPayload) => {
  const key = 'class';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, id],
    queryFn: () =>
      classApi.getClassDetails({
        id,
      }),
  });

  const attendanceQueryData = useQuery({
    queryKey: ['attendanceList', id],
    queryFn: () =>
      classApi.getMentorClassAttendances({
        id,
      }),
  });
  const createClassSections = useMutation({
    mutationKey: [key.concat('_crate_classSections')],
    mutationFn: classApi.createClassSections,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  const updateClassSections = useMutation({
    mutationKey: [key.concat('_update_classSections')],
    mutationFn: classApi.updateClassSections,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  const deleteClassSections = useMutation({
    mutationKey: [key.concat('_delete_classSections')],
    mutationFn: classApi.deleteClassSections,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });
  return {
    error,
    classDetails: data,
    attendanceQueryData,
    isLoading,
    refetch,
    //
    createClassSections,
    updateClassSections,
    deleteClassSections,
  };
};
