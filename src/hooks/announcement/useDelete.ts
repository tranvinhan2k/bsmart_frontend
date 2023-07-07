import { useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';
import { keyAnnouncementUseDelete, keyAnnouncementUseSearch } from './key';

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  const deleteAnnouncement = useMutation({
    mutationKey: [keyAnnouncementUseDelete],
    mutationFn: announcementApi.deleteAnnouncement,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [keyAnnouncementUseSearch] }),
  });

  return deleteAnnouncement;
};
