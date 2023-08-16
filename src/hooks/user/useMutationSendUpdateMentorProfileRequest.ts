import { useMutation } from '@tanstack/react-query';
import mentorProfileApi from '~/api/mentors';
import { Key } from './key';

export const useMutationSendUpdateMentorProfileRequest = () => {
  const mutationResult = useMutation({
    mutationKey: [Key.UseMutationUpdateMentorProfileRequest],
    mutationFn: mentorProfileApi.sendUpdateMentorProfileRequest,
  });
  return mutationResult;
};
