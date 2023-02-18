import { useEffect } from 'react';
import HomePageSection from '~/containers/HomePageSection';
import { scrollToTop } from '~/utils/common';

export default function HomePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <HomePageSection />;
}
