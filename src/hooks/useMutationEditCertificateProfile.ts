import { useMutation, useQueryClient } from '@tanstack/react-query';
import accountApi from '~/api/users';

export const useMutationEditCertificateProfile = () => {
  const key = 'edit_certificate_profile';
  const keyGetProfile = '/loginUser';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: accountApi.editCertificateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyGetProfile] });
    },
  });
  return mutationResult;
};
