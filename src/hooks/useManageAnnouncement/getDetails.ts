import { useQuery } from '@tanstack/react-query';
import { UseGetDetailsAnnouncementPayload } from '~/models/announcement';
import { keyGetDetails } from './key';
import announcementApi from '~/api/announcement';

export const useGetDetailsAnnouncement = ({
  idClassSection,
  idAnnouncement,
}: UseGetDetailsAnnouncementPayload) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [keyGetDetails, idClassSection, idAnnouncement],
    queryFn: () =>
      announcementApi.getDetailsAnnouncement({
        idClassSection,
        idAnnouncement,
      }),
  });

  return {
    announcementDetails: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
