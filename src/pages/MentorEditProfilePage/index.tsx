// import EditCertificateInformationSection from '~/containers/EditProfileSection/EditCertificateInformationSection';
import DisplayCISection from '~/components/molecules/FormComponent/EditProfileForm/DisplayCISection';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
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
      {/* <EditCertificateInformationSection /> */}
      <EditCertificateProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
