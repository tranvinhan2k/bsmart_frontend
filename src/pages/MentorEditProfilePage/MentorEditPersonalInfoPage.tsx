import { useEffect } from 'react';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import { scrollToTop } from '~/utils/common';

export default function MentorEditPersonalInfo() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return <EditPersonalProfileForm />;
}
