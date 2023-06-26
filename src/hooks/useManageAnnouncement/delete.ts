import { useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';
import { keyDelete, keySearch } from './key';

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  const deleteAnnouncement = useMutation({
    mutationKey: [keyDelete],
    mutationFn: announcementApi.deleteAnnouncement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [keySearch] }),
  });

  return deleteAnnouncement;
};
