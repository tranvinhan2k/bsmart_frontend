import {
  Button as MuiButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { defaultValueEditIdentityFront } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditIdentityFrontFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { ProfileImgType } from '~/constants/profile';
import { useMutationEditIdentityFront } from '~/hooks/useMutationEditIdentityFront';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { validationSchemaEditIdentityFront } from '~/form/validation';
import { FontFamily } from '~/assets/variables';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';

interface DialogEditIdCardFrontProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogEditIdCardFront({
  open,
  handleOnClose,
}: DialogEditIdCardFrontProps) {
  const resolverEditIdentityFront = useYupValidationResolver(
    validationSchemaEditIdentityFront
  );

  const {
    control: controlEditIdentityFront,
    handleSubmit: handleSubmitEditIdentityFront,
    reset: resetEditIdentityFront,
  } = useForm({
    defaultValues: defaultValueEditIdentityFront,
    resolver: resolverEditIdentityFront,
  });

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditIdentityFront } =
    useMutationEditIdentityFront();

  const toastMsgLoading = 'Đang cập nhật ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${error.message}`;
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
      <DialogTitle>Cập nhật chứng minh thư (Mặt trước)</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmitEditIdentityFront(handleSubmitIdentityFront)}
        >
          <FormInput
            control={controlEditIdentityFront}
            name={EDIT_IMAGE_PROFILE_FIELDS.identityFront}
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
