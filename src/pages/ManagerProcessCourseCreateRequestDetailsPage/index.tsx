import { useEffect } from 'react';
import ProcessCourseCreateRequestDetails from '~/containers/ProcessCourseCreateRequestDetails';
import { scrollToTop } from '~/utils/common';

export default function ManagerProcessCourseCreateRequestDetailsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <ProcessCourseCreateRequestDetails />;
}
