import { useMutation } from '@tanstack/react-query';
import configApi from '~/api/config';
import { Key } from './key';

export interface UseMutationConfigReferralCodePayload {
  usageLimit: number;
  discountPercent: number;
  expiredLaterDay: number;
}

export const useMutationConfigReferralCode = () => {
  return useMutation({
    mutationKey: [Key.UseMutationConfigReferralCode],
    mutationFn: configApi.editConfigReferralCode,
  });
};
