import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';
import ProcessRegisterRequestDetails from '~/containers/ProcessRegisterRequestDetails';

export default function ManagerProcessRegisterRequestDetailsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <ProcessRegisterRequestDetails />;
}
