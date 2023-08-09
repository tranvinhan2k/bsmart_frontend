import { Button as MuiButton, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { defaultValueEditAvatar } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditAvatarFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import { ProfileImgType } from '~/constants/profile';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { selectProfile } from '~/redux/user/selector';
import { useMutationEditAvatar } from '~/hooks/useMutationEditAvatar';
import { validationSchemaEditAvatar } from '~/form/validation';
import CustomDialog from '~/components/atoms/CustomDialog';
import FormInput from '~/components/atoms/FormInput';
import UpdateProfileButton from '~/components/atoms/Button/UpdateProfileButton';
import toast from '~/utils/toast';

interface DialogEditAvatarProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogUpdateAvatar({
  open,
  handleOnClose,
}: DialogEditAvatarProps) {
  const profile = useSelector(selectProfile);

  const resolverEditAvatar = useYupValidationResolver(
    validationSchemaEditAvatar
  );

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: defaultValueEditAvatar,
    resolver: resolverEditAvatar,
  });

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditAvatar } = useMutationEditAvatar();
  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const toastMsgError = (error: any): string =>
    `Cập nhật không thành công: ${error.message}`;
  const handleSubmitAvatar = async (data: EditAvatarFormDataPayload) => {
    const params: EditImageProfilePayload = {
      imageType: ProfileImgType.AVATAR,
      file: data.avatar,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditAvatar(params);
      handleOnClose();
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
      reset();
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  const handleOnCloseCustom = () => {
    reset();
    handleOnClose();
  };

  return (
    <CustomDialog
      title="Cập nhật ảnh đại diện"
      onClose={handleOnCloseCustom}
      open={open}
    >
      <form onSubmit={handleSubmit(handleSubmitAvatar)}>
        <FormInput
          control={control}
          name={EDIT_IMAGE_PROFILE_FIELDS.avatar}
          variant="image"
          previewImgHeight={300}
          previewImgWidth={300}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          mt={2}
        >
          <MuiButton
            color="error"
            fullWidth
            size="large"
            type="button"
            variant="contained"
            onClick={handleOnCloseCustom}
            sx={{ fontFamily: FontFamily.bold }}
          >
            Hủy
          </MuiButton>
          <UpdateProfileButton
            role={profile.roles?.[0]?.code}
            isFormDisabled={!formState.isDirty}
            mentorProfileStatus={profile?.mentorProfile?.status}
          />
        </Stack>
      </form>
    </CustomDialog>
  );
}
