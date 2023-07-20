import { useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';
import { keyAnnouncementUseCreate, keyAnnouncementUseSearch } from './key';

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  const createAnnouncement = useMutation({
    mutationKey: [keyAnnouncementUseCreate],
    mutationFn: announcementApi.createAnnouncement,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [keyAnnouncementUseSearch] }),
  });

  return { createAnnouncement };
};
