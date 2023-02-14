import { useEffect } from 'react';
import AboutUsSection from '~/containers/AboutUsSection';
import { scrollToTop } from '~/utils/common';

function AboutUsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <AboutUsSection />;
}
export default AboutUsPage;
