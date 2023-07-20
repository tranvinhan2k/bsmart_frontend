import { useQuery } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';
import { UseSearchAnnouncementsPayload } from '~/models/announcement';
import { keyAnnouncementUseSearch } from './key';

export const useSearchAnnouncements = ({
  idClassSection,
  page,
  size,
  sort,
}: UseSearchAnnouncementsPayload) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [keyAnnouncementUseSearch, idClassSection, page, size, sort],
    queryFn: () =>
      announcementApi.searchAnnouncement({
        idClassSection,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    announcements: data,
    isError,
    isLoading,
    refetch,
  };
};
