import { useEffect } from 'react';
import DisplayCISection from '~/components/molecules/FormComponent/EditProfileForm/DisplayCISection';
import { scrollToTop } from '~/utils/common';

export default function MemberEditImgInfoPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <DisplayCISection />;
}
