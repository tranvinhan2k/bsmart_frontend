import { useMutation, useQueryClient } from '@tanstack/react-query';
import attendanceApi from '~/api/attendances';

export const useMutationTakeAttendance = () => {
  const key = 'take_attendance';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: attendanceApi.takeAttendance,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
