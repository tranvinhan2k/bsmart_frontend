import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { defaultValueEditAvatar } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditAvatarFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { ProfileImgType } from '~/constants/profile';
import { useMutationEditAvatar } from '~/hooks/useMutationEditAvatar';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditAvatar } from '~/form/validation';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM_LABEL } from '../style';

interface DialogUpdateAvatarProps {
  open: boolean;
  handleOnClose: () => void;
  dataGetProfile: any;
}

export default function DialogUpdateAvatar({
  open,
  handleOnClose,
  dataGetProfile,
}: DialogUpdateAvatarProps) {
  const resolverEditAvatar = useYupValidationResolver(
    validationSchemaEditAvatar
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditAvatar,
    resolver: resolverEditAvatar,
  });

  useEffect(() => {
    if (dataGetProfile) {
      const defaultOfEditAvatar = defaultValueEditAvatar;

      if (dataGetProfile.avatar) {
        defaultOfEditAvatar.avatar = dataGetProfile.avatar;
        reset(defaultOfEditAvatar);
      }
    }
  }, [dataGetProfile, reset]);

  const { mutateAsync: mutateEditAvatar } = useMutationEditAvatar();

  const toastMsgLoading = 'Đang cập nhật ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
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
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth>
      <DialogTitle>Cập nhật Avatar</DialogTitle>
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <form onSubmit={handleSubmit(handleSubmitAvatar)}>
            <Typography sx={SX_FORM_LABEL}>Avatar</Typography>
            <FormInput
              control={control}
              name={EDIT_IMAGE_PROFILE_FIELDS.avatar}
              variant="image"
              previewImgHeight={300}
              previewImgWidth={300}
            />
            <Box mt={4}>
              <Button customVariant="normal" type="submit">
                Cập nhật
              </Button>
            </Box>
          </form>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} variant="outlined" color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
