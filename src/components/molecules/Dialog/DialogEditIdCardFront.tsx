import {
  Button as MuiButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { EditImageProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import UpdateProfileButton from '~/components/atoms/Button/UpdateProfileButton';
import FormInput from '~/components/atoms/FormInput';
import { ProfileImgType } from '~/constants/profile';
import { defaultValueEditIdentityFront } from '~/form/defaultValues';
import { TRY_CATCH_AXIOS_DEFAULT_ERROR } from '~/form/message';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { validationSchemaEditIdentityFront } from '~/form/validation';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useMutationEditIdentityFront } from '~/hooks/useMutationEditIdentityFront';
import { EditIdentityFrontFormDataPayload } from '~/models/form';
import { selectProfile } from '~/redux/user/selector';
import toast from '~/utils/toast';

interface DialogEditIdCardFrontProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogEditIdCardFront({
  open,
  handleOnClose,
}: DialogEditIdCardFrontProps) {
  const profile = useSelector(selectProfile);
  const resolverEditIdentityFront = useYupValidationResolver(
    validationSchemaEditIdentityFront
  );

  const {
    control: controlEditIdentityFront,
    handleSubmit: handleSubmitEditIdentityFront,
    reset: resetEditIdentityFront,
    formState,
  } = useForm({
    defaultValues: defaultValueEditIdentityFront,
    resolver: resolverEditIdentityFront,
  });

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditIdentityFront } =
    useMutationEditIdentityFront();

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công...';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${
      error.message ?? TRY_CATCH_AXIOS_DEFAULT_ERROR
    }`;
  };
  const handleSubmitIdentityFront = async (
    data: EditIdentityFrontFormDataPayload
  ) => {
    const params: EditImageProfilePayload = {
      imageType: ProfileImgType.FRONTCI,
      file: data.identityFront,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditIdentityFront(params);
      handleOnClose();
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
      resetEditIdentityFront();
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  const handleOnCloseCustom = () => {
    resetEditIdentityFront();
    handleOnClose();
  };

  return (
    <Dialog open={open} onClose={handleOnCloseCustom} fullWidth>
      <DialogTitle>Cập nhật CMND/CCCD (Mặt trước)</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmitEditIdentityFront(handleSubmitIdentityFront)}
        >
          <FormInput
            control={controlEditIdentityFront}
            name={EDIT_IMAGE_PROFILE_FIELDS.identityFront}
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
            <UpdateProfileButton
              role={profile.roles?.[0]?.code}
              isFormDisabled={!formState.isDirty}
              mentorProfileStatus={profile?.mentorProfile?.status}
            />
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
