import { useEffect } from 'react';
import MentorCreateCourseRequestDetails from '~/containers/MentorCreateCourseRequestDetails';
import { scrollToTop } from '~/utils/common';

export default function AdminProcessCourseCreateRequestDetailsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <MentorCreateCourseRequestDetails />;
}
