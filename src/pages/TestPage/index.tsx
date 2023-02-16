import { useEffect } from 'react';
import TestSection from '~/containers/Test/TestSection';
import { scrollToTop } from '~/utils/common';

function TestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <TestSection />;
}
export default TestPage;
