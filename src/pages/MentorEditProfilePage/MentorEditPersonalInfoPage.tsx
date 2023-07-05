import { useEffect } from 'react';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';
import { scrollToTop } from '~/utils/common';

export default function MentorEditPersonalInfo() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <EditPersonalProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
