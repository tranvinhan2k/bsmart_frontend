import { useMutation } from '@tanstack/react-query';
import coursesApi from '~/api/courses';
import { Key } from './key';

export const useMutationUnblockCourse = (id: number) => {
  return useMutation({
    mutationKey: [Key.useMutationUnblockCourse, id],
    mutationFn: coursesApi.unblockCourse,
  });
};
