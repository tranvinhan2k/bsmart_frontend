import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';
import MentorRegisterRequestDetails from '~/containers/MentorRegisterRequestDetails';

export default function MentorRegisterRequestDetailsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <MentorRegisterRequestDetails />;
}
