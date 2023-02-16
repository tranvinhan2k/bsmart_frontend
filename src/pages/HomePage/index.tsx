import { useEffect } from 'react';
import IndexSection from '~/containers/IndexSection';
import { scrollToTop } from '~/utils/common';

export default function HomePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <IndexSection />;
}
