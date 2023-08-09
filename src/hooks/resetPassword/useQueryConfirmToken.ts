import resetPasswordApi from '~/api/resetPassword';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useQueryConfirmToken = (token: string) => {
  return useCustomQuery(['verify_token'], () =>
    resetPasswordApi.confirmEmailIsValid(token)
  );
};
