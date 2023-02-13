import { useEffect } from 'react';
import TestSection from '~/containers/Test/TestSection';
import { scrollToTop } from '~/utils/common';

function HomePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <TestSection />;
}
export default HomePage;
