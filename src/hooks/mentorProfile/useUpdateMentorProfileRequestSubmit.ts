import { useMutation } from '@tanstack/react-query';
import mentorProfilesApi from '~/api/mentorProfile';
import { Key } from './key';

export const useUpdateMentorProfileRequestSubmit = () => {
  const updateMentorProfileRequestSubmit = useMutation({
    mutationKey: [Key.UseUpdateMentorProfileRequestSubmit],
    mutationFn: mentorProfilesApi.updateMentorProfileRequestSubmit,
  });

  return updateMentorProfileRequestSubmit;
};
