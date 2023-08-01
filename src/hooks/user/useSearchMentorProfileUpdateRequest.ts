import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import mentorProfilesApi from '~/api/mentorProfile';

export interface UseSearchMentorProfileUpdateRequestPayload {
  status: string;
  q?: string;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export const useSearchMentorProfileUpdateRequest = ({
  q = '',
  status,
  page = 0,
  size = null,
  sort = [],
}: UseSearchMentorProfileUpdateRequestPayload) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseSearchRegisterRequest, status, q, page, size, sort],
    queryFn: () =>
      mentorProfilesApi.searchMentorProfileUpdateRequest({
        status,
        q,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    mentorProfileUpdateRequestList: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
