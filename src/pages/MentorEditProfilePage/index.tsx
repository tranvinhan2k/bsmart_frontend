import DisplayCISection from '~/components/molecules/FormComponent/EditProfileForm/DisplayCISection';
import EditPasswordProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPasswordProfileForm';
import EditCertificateProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditCertificateProfileForm';
import EditMentorProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditMentorProfileForm';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function MentorEditProfilePage() {
  return (
    <>
      <DisplayCISection />
      <EditPersonalProfileForm />
      <EditMentorProfileForm />
      <EditCertificateProfileForm />
      <EditPasswordProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
