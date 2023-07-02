import { useMutation, useQueryClient } from '@tanstack/react-query';
import announcementApi from '~/api/announcement';
import { keyCreate, keySearch } from './key';

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  const createAnnouncement = useMutation({
    mutationKey: [keyCreate],
    mutationFn: announcementApi.createAnnouncement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [keySearch] }),
  });

  return { createAnnouncement };
};
