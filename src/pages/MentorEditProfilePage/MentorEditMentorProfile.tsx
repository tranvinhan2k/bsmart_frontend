import { useEffect } from 'react';
import EditCertificateProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditCertificateProfileForm';
import EditMentorProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditMentorProfileForm';
import MentorProfileProgress from '~/components/molecules/FormComponent/EditProfileForm/MentorProfileProgress';
import { scrollToTop } from '~/utils/common';

export default function MentorEditProfileImgPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <MentorProfileProgress />
      <EditMentorProfileForm />
      <EditCertificateProfileForm />
    </>
  );
}
