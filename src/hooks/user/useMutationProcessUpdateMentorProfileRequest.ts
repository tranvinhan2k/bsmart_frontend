import { useMutation } from '@tanstack/react-query';
import { Key } from './key';
import mentorProfilesApi from '~/api/mentorProfile';

export interface UseMutationProcessUpdateMentorProfileRequestPayload {
  id: number;
  status: boolean;
}

export const useMutationProcessUpdateMentorProfileRequest = () => {
  const processUpdateMentorProfileRequest = useMutation({
    mutationKey: [Key.useMutationProcessUpdateMentorProfileRequest],
    mutationFn: mentorProfilesApi.processUpdateMentorProfileRequest,
  });

  return { processUpdateMentorProfileRequest };
};
