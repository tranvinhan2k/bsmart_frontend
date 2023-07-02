import { useEffect } from 'react';
import DisplayEditPasswordSection from '~/components/molecules/FormComponent/EditProfileForm/DisplayEditPasswordSection';
import { scrollToTop } from '~/utils/common';

export default function MentorEditPersonalInfo() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <DisplayEditPasswordSection />;
}
