import { useMutation, useQueryClient } from '@tanstack/react-query';
import courseCreateRequestApi from '~/api/courseCreateRequest';
import {
  KeyUseMutationProcessCourseCreateRequest,
  keyUseSearchCourseCreateRequest,
} from './key';

export const useMutationProcessCourseCreateRequest = () => {
  const queryClient = useQueryClient();

  const processCourseCreateRequestMutation = useMutation({
    mutationKey: [KeyUseMutationProcessCourseCreateRequest],
    mutationFn: courseCreateRequestApi.approveCourseCreateRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyUseSearchCourseCreateRequest,
      });
    },
  });

  return { processCourseCreateRequestMutation };
};
