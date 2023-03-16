import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
import EditCertificateProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditCertificateProfileForm';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';
import EditCertificateInformationSection from '~/containers/EditProfileSection/EditCertificateInformationSection';

export default function MentorEditProfilePage() {
  return (
    <>
      <EditPersonalProfileForm />
      <EditCertificateInformationSection />
      <EditCertificateProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
