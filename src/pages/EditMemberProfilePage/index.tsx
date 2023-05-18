import DisplayCISection from '~/components/molecules/FormComponent/EditProfileForm/DisplayCISection';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function EditMemberProfilePage() {
  return (
    <>
      <DisplayCISection />
      <EditPersonalProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
