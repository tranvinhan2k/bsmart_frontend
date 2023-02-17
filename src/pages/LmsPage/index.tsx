import { useEffect } from 'react';
import LmsSection from '~/containers/LmsSection';
import { scrollToTop } from '~/utils/common';

function LmsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <LmsSection />;
}
export default LmsPage;
