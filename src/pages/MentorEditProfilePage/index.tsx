import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
// import EditCertificateInformationSection from '~/containers/EditProfileSection/EditCertificateInformationSection';
import EditCertificateProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditCertificateProfileForm';
import EditImageProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditImageProfileForm';
import EditMentorProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditMentorProfileForm';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function MentorEditProfilePage() {
  return (
    <>
      <EditImageProfileForm />
      <EditPersonalProfileForm />
      <EditMentorProfileForm />
      {/* <EditCertificateInformationSection /> */}
      <EditCertificateProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
