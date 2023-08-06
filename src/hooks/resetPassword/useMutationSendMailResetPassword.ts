import resetPasswordApi from '~/api/resetPassword';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationSendMailResetPassword = () => {
  return useCustomMutation(
    ['send_mail_reset_password'],
    resetPasswordApi.sendMailResetPassword
  );
};
