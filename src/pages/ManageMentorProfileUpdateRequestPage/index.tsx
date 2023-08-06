import { useEffect } from 'react';
import ManageMentorProfileUpdateRequestSection from '~/components/molecules/ManageRequestSection/ManageMentorProfileUpdateRequestSection';
import { scrollToTop } from '~/utils/common';

export default function ManageMentorProfileUpdateRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <ManageMentorProfileUpdateRequestSection />;
}
