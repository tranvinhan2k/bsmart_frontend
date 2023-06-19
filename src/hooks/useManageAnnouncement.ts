import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';

export interface UseManageAnnouncementPayload {
  id?: number;
}

export const useManageAnnouncement = ({ id }: UseManageAnnouncementPayload) => {
  const key = 'announcement';
  const queryClient = useQueryClient();

  const createAnnouncement = useMutation({
    mutationKey: [key.concat('_crate')],
    mutationFn: announcementApi.createAnnouncement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  return {
    createAnnouncement,
  };
};
