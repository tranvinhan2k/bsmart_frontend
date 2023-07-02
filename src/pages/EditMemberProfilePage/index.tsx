import DisplayCISection from '~/components/molecules/FormComponent/EditProfileForm/DisplayCISection';
import DisplayEditPasswordSection from '~/components/molecules/FormComponent/EditProfileForm/DisplayEditPasswordSection';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function EditMemberProfilePage() {
  return (
    <>
      <DisplayCISection />
      <EditPersonalProfileForm />
      <DisplayEditPasswordSection />
      <EditSocialProfileForm />
    </>
  );
}
