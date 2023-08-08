import { useMutation } from '@tanstack/react-query';
import coursesApi from '~/api/courses';
import { Key } from './key';

export const useMutationBlockCourse = (id: number) => {
  return useMutation({
    mutationKey: [Key.useMutationBlockCourse, id],
    mutationFn: coursesApi.blockCourse,
  });
};
