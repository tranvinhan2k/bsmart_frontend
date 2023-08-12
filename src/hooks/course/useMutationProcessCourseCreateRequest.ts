import { useMutation } from '@tanstack/react-query';
import { Key } from './key';
import coursesApi from '~/api/courses';

export const useMutationProcessCourseCreateRequest = () => {
  const processCourseCreateRequestMutation = useMutation({
    mutationKey: [Key.UseMutationProcessCourseCreateRequest],
    mutationFn: coursesApi.processCourseCreateRequest,
  });

  return { processCourseCreateRequestMutation };
};
