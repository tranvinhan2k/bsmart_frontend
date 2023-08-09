import { useEffect } from 'react';
import MentorSendRequestSection from '~/containers/MentorSendRequestSection';
import { scrollToTop } from '~/utils/common';

export default function MentorSendRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <MentorSendRequestSection />;
}
