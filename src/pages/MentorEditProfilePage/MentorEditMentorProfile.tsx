import { useEffect } from 'react';
import EditCertificateProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditCertificateProfileForm';
import EditIdCardSection from '~/components/molecules/FormComponent/EditProfileForm/EditIdCardSection';
import EditMentorProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditMentorProfileForm';
import { scrollToTop } from '~/utils/common';

export default function MentorEditProfileImgPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <EditMentorProfileForm />
      <EditCertificateProfileForm />
    </>
  );
}
