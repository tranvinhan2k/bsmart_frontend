import { useMutation } from '@tanstack/react-query';
import mentorProfileApi from '~/api/mentors';
import { Key } from './key';

export const useMutationUpdateMentorProfileRequest = () => {
  const mutationResult = useMutation({
    mutationKey: [Key.UseMutationUpdateMentorProfileRequest],
    mutationFn: mentorProfileApi.updateMentorProfileRequest,
  });
  return mutationResult;
};
