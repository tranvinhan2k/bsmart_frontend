import { useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';
import { keyAnnouncementUseUpdate, keyAnnouncementUseSearch } from './key';

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();

  const updateAnnouncement = useMutation({
    mutationKey: [keyAnnouncementUseUpdate],
    mutationFn: announcementApi.updateAnnouncement,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [keyAnnouncementUseSearch] }),
  });

  return updateAnnouncement;
};
