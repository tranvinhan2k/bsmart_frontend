import {
  Button as MuiButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditImageProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import FormInput from '~/components/atoms/FormInput';
import { ProfileImgType } from '~/constants/profile';
import { defaultValueEditIdentityBack } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { validationSchemaEditIdentityBack } from '~/form/validation';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useMutationEditIdentityBack } from '~/hooks/useMutationEditIdentityBack';
import { EditIdentityBackFormDataPayload } from '~/models/form';
import toast from '~/utils/toast';

interface DialogEditIdCardBackProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogEditIdCardBack({
  open,
  handleOnClose,
}: DialogEditIdCardBackProps) {
  const resolverEditIdentityBack = useYupValidationResolver(
    validationSchemaEditIdentityBack
  );

  const {
    control: controlEditIdentityBack,
    handleSubmit: handleSubmitEditIdentityBack,
    reset: resetEditIdentityBack,
  } = useForm({
    defaultValues: defaultValueEditIdentityBack,
    resolver: resolverEditIdentityBack,
  });

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditIdentityBack } = useMutationEditIdentityBack();

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${error.message}`;
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
            <MuiButton
              color="miSmartOrange"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ fontFamily: FontFamily.bold }}
            >
              Cập nhật
            </MuiButton>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
