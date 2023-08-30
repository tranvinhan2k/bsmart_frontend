import {
  Button as MuiButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { defaultValueEditIdentityBack } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditIdentityBackFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import { ProfileImgType } from '~/constants/profile';
import { selectProfile } from '~/redux/user/selector';
import { toastMsgError } from '~/utils/common';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useMutationEditIdentityBack } from '~/hooks/useMutationEditIdentityBack';
import { validationSchemaEditIdentityBack } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import UpdateProfileButton from '~/components/atoms/Button/UpdateProfileButton';
import toast from '~/utils/toast';
import { useAIConvert } from '~/hooks/useAIConvert';

interface DialogEditIdCardBackEditProfileProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogEditIdCardBackEditProfile({
  open,
  handleOnClose,
}: DialogEditIdCardBackEditProfileProps) {
  const profile = useSelector(selectProfile);
  const resolverEditIdentityBack = useYupValidationResolver(
    validationSchemaEditIdentityBack
  );

  const {
    control: controlEditIdentityBack,
    handleSubmit: handleSubmitEditIdentityBack,
    reset: resetEditIdentityBack,
    formState,
  } = useForm({
    defaultValues: defaultValueEditIdentityBack,
    resolver: resolverEditIdentityBack,
  });

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditIdentityBack } = useMutationEditIdentityBack();
  const { mutateAsync } = useAIConvert();

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const handleSubmitIdentityBack = async (
    data: EditIdentityBackFormDataPayload
  ) => {
    const params: EditImageProfilePayload = {
      file: data.identityBack,
      imageType: ProfileImgType.BACKCI,
      status: true,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateAsync(data.identityBack);
      await mutateEditIdentityBack(params);
      handleOnClose();
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
      resetEditIdentityBack();
    } catch (error: unknown) {
      toast.updateFailedToast(
        id,
        'Cập nhật hình ảnh thất bại. Vui lòng xem lại hình ảnh và thử lại.'
      );
    }
  };

  const handleOnCloseCustom = () => {
    resetEditIdentityBack();
    handleOnClose();
  };

  return (
    <Dialog open={open} onClose={handleOnCloseCustom} fullWidth>
      <DialogTitle>Cập nhật CMND/CCCD (Mặt sau)</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitEditIdentityBack(handleSubmitIdentityBack)}>
          <FormInput
            control={controlEditIdentityBack}
            name={EDIT_IMAGE_PROFILE_FIELDS.identityBack}
            variant="image"
            previewImgHeight={539.8 / 2}
            previewImgWidth={856 / 2}
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
            <MuiButton
              color="miSmartOrange"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ fontFamily: FontFamily.bold }}
              disabled={!formState.isDirty}
            >
              Cập nhật
            </MuiButton>
            {/* <UpdateProfileButton
              role={profile.roles?.[0]?.code}
              isFormDisabled={!formState.isDirty}
              mentorProfileStatus={profile?.mentorProfile?.status}
            /> */}
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
