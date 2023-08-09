import resetPasswordApi from '~/api/resetPassword';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationResetPassword = () => {
  return useCustomMutation(['reset_password'], resetPasswordApi.resetPassword);
};
