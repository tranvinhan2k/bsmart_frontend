import { useQuery } from '@tanstack/react-query';
import feedbacksApi from '~/api/feedback';

export const useQueryMemberFeedback = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['member_feedback'],
    queryFn: () => feedbacksApi.getMemberClassFeedback(id),
    enabled,
    refetchOnWindowFocus: false,
  });
};
