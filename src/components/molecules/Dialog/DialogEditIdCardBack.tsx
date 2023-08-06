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
import { TRY_CATCH_AXIOS_DEFAULT_ERROR } from '~/form/message';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useMutationEditIdentityBack } from '~/hooks/useMutationEditIdentityBack';
import { validationSchemaEditIdentityBack } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import UpdateProfileButton from '~/components/atoms/Button/UpdateProfileButton';

interface DialogEditIdCardBackProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogEditIdCardBack({
  open,
  handleOnClose,
}: DialogEditIdCardBackProps) {
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

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${
      error.message ?? TRY_CATCH_AXIOS_DEFAULT_ERROR
    }`;
  };
  const handleSubmitIdentityBack = async (
    data: EditIdentityBackFormDataPayload
  ) => {
    const params: EditImageProfilePayload = {
      file: data.identityBack,
      imageType: ProfileImgType.BACKCI,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditIdentityBack(params);
      handleOnClose();
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
      resetEditIdentityBack();
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  const handleOnCloseCustom = () => {
    resetEditIdentityBack();
    handleOnClose();
  };

  return (
    <Dialog open={open} onClose={handleOnCloseCustom} fullWidth>
      <DialogTitle>Cập nhật chứng minh thư (Mặt sau)</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitEditIdentityBack(handleSubmitIdentityBack)}>
          <FormInput
            control={controlEditIdentityBack}
            name={EDIT_IMAGE_PROFILE_FIELDS.identityBack}
            variant="image"
            previewImgHeight={300}
            previewImgWidth={500}
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
