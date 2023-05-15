import DisplayCISection from '~/components/molecules/FormComponent/EditProfileForm/DisplayCISection';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
import EditImageProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditImageProfileForm';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function EditMemberProfilePage() {
  return (
    <>
      <EditImageProfileForm />
      <DisplayCISection />
      <EditPersonalProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
