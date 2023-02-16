import { useEffect } from 'react';
import HomeSection from '~/containers/HomeSection';
import { scrollToTop } from '~/utils/common';

export default function HomePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <HomeSection />;
}
