import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';

export interface UseManageAnnouncementPayload {
  idClassSection: number;
  page?: number;
  size?: number;
  sort?: string[];
}

export const useManageAnnouncement = ({
  idClassSection,
  page,
  size,
  sort,
}: UseManageAnnouncementPayload) => {
  const key = 'announcement';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, idClassSection, page, size, sort],
    queryFn: () =>
      announcementApi.searchAnnouncement({
        idClassSection,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  const createAnnouncement = useMutation({
    mutationKey: [key.concat('_create')],
    mutationFn: announcementApi.createAnnouncement,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [key.concat('_create')] }),
  });
  const deleteAnnouncement = useMutation({
    mutationKey: [key.concat('_delete')],
    mutationFn: announcementApi.deleteAnnouncement,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [key.concat('_delete')] }),
  });

  return {
    error,
    announcements: data,
    isLoading,
    refetch,
    createAnnouncement,
    deleteAnnouncement,
  };
};
