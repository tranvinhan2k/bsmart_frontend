import { useEffect } from 'react';
import BlogSection from '~/containers/BlogSection';
import { scrollToTop } from '~/utils/common';

export default function BlogPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <BlogSection />;
}
