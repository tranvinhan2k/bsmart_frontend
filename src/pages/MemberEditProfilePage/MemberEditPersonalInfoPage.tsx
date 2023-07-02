import { useEffect } from 'react';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import { scrollToTop } from '~/utils/common';

export default function MemberEditProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <EditPersonalProfileForm />;
}
