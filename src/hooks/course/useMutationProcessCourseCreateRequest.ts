import { useMutation } from '@tanstack/react-query';
import { Key } from './key';
import courseCreateRequestApi from '~/api/courseCreateRequest';

export const useMutationProcessCourseCreateRequest = () => {
  const processCourseCreateRequestMutation = useMutation({
    mutationKey: [Key.UseMutationProcessCourseCreateRequest],
    mutationFn: courseCreateRequestApi.processCourseCreateRequest,
  });

  return { processCourseCreateRequestMutation };
};
