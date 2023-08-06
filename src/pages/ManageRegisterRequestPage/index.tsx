import { useEffect } from 'react';
import ManageRegisterRequestSection from '~/components/molecules/ManageRequestSection/ManageRegisterRequestSection';
import { scrollToTop } from '~/utils/common';

export default function ManageRegisterRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <ManageRegisterRequestSection />;
}
