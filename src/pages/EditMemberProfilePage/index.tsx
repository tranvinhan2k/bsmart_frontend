import DisplayCISection from '~/components/molecules/FormComponent/EditProfileForm/DisplayCISection';
import EditPasswordProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPasswordProfileForm';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function EditMemberProfilePage() {
  return (
    <>
      <DisplayCISection />
      <EditPersonalProfileForm />
      <EditPasswordProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
