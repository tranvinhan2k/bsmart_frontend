import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditPersonalProfileForm';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditAccountProfileForm';
import EditImageProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditImageProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditProfileForm/EditSocialProfileForm';

export default function EditMemberProfilePage() {
  return (
    <>
      <EditImageProfileForm />
      <EditPersonalProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
