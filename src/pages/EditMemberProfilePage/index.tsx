import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function EditMemberProfilePage() {
  return (
    <>
      <EditPersonalProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
