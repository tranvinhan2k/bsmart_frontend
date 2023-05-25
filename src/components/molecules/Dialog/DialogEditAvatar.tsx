import { useForm } from 'react-hook-form';
import {
  Button as MuiButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { defaultValueEditAvatar } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditAvatarFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { ProfileImgType } from '~/constants/profile';
import { useMutationEditAvatar } from '~/hooks/useMutationEditAvatar';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditAvatar } from '~/form/validation';
import { FontFamily } from '~/assets/variables';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM_LABEL } from './style';

interface DialogEditAvatarProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogUpdateAvatar({
  open,
  handleOnClose,
}: DialogEditAvatarProps) {
  const resolverEditAvatar = useYupValidationResolver(
    validationSchemaEditAvatar
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditAvatar,
    resolver: resolverEditAvatar,
  });

  const { mutateAsync: mutateEditAvatar } = useMutationEditAvatar();

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${error.message}`;
  };
  const handleSubmitAvatar = async (data: EditAvatarFormDataPayload) => {
    const params: EditImageProfilePayload = {
      imageType: ProfileImgType.AVATAR,
      file: data.avatar,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditAvatar(params);
      handleOnClose();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  const handleOnCloseCustom = () => {
    reset();
    handleOnClose();
  };

  return (
    <Dialog open={open} onClose={handleOnCloseCustom} fullWidth>
      <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSubmitAvatar)}>
          <Typography sx={SX_FORM_LABEL}>Avatar</Typography>
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
              color="miSmartOrange"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ fontFamily: FontFamily.bold }}
            >
              Cập nhật
            </MuiButton>
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
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
