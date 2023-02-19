import { useEffect } from 'react';
import AnnotationSection from '~/containers/AnnotationSection';
import { scrollToTop } from '~/utils/common';

export default function AnnotationPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <AnnotationSection />;
}
