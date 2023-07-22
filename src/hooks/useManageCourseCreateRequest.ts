import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import courseCreateRequestApi from '~/api/courseCreateRequest';

export interface UseManageCourseCreateRequestPayload {
  status?: string;
  q?: string;
  size?: number | null;
  sort?: string;
}

export const useManageCourseCreateRequest = ({
  status,
  q,
  size,
  sort,
}: UseManageCourseCreateRequestPayload) => {
  const key = 'course_create_request';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, status, q, size, sort],
    queryFn: () =>
      courseCreateRequestApi.searchCourseCreateRequest({
        status,
        q,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  const approveCourseCreateRequestMutation = useMutation({
    mutationKey: [key.concat('_approve')],
    mutationFn: courseCreateRequestApi.approveCourseCreateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  return {
    error,
    courseCreateRequest: data,
    isLoading,
    refetch,
    approveCourseCreateRequestMutation,
  };
};
