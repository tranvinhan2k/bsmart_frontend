import EditAccountInformationSection from '~/containers/EditProfileSection/EditAccountInformationSection';
import EditBasicInformationSection from '~/containers/EditProfileSection/EditBasicInformationSection';
import EditCertificateInformationSection from '~/containers/EditProfileSection/EditCertificateInformationSection';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function MentorEditProfilePage() {
  return (
    <>
      <EditPersonalProfileForm />
      <EditCertificateInformationSection />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
