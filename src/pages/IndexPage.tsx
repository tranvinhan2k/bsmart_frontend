import { useEffect } from 'react';
import IndexSection from '~/containers/IndexSection';
import { scrollToTop } from '~/utils/common';

export default function IndexPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <IndexSection />;
}
