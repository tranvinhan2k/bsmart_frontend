import { useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';
import { keyUpdate, keySearch } from './key';

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();

  const updateAnnouncement = useMutation({
    mutationKey: [keyUpdate],
    mutationFn: announcementApi.updateAnnouncement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [keySearch] }),
  });

  return updateAnnouncement;
};
