import { useEffect } from 'react';
import HomeSection from '~/containers/HomeSection';
import { scrollToTop } from '~/utils/common';

function HomePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <HomeSection />;
}
export default HomePage;
