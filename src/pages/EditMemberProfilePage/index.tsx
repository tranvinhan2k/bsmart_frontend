import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditMemberProfileForm/EditPersonalProfileForm';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditMemberProfileForm/EditAccountProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditMemberProfileForm/EditSocialProfileForm';

export default function EditMemberProfilePage() {
  return (
    <>
      <EditPersonalProfileForm />
      <EditAccountProfileForm />
      <EditSocialProfileForm />
    </>
  );
}
