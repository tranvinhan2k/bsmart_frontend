import { useQuery } from '@tanstack/react-query';
import { UseGetDetailsAnnouncementPayload } from '~/models/announcement';
import { keyAnnouncementUseGetDetails } from './key';
import announcementApi from '~/api/announcement';

export const useGetDetailsAnnouncement = ({
  idClassSection,
  idAnnouncement,
}: UseGetDetailsAnnouncementPayload) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [keyAnnouncementUseGetDetails, idClassSection, idAnnouncement],
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
