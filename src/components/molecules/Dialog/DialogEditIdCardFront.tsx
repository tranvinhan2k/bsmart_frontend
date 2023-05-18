import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { defaultValueEditIdentityFront } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditIdentityFrontFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { ProfileImgType } from '~/constants/profile';
import { useMutationEditIdentityFront } from '~/hooks/useMutationEditIdentityFront';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditIdentityFront } from '~/form/validation';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM_LABEL } from './style';

interface DialogEditIdCardFrontProps {
  open: boolean;
  handleOnClose: () => void;
  profile: any;
}

export default function DialogEditIdCardFront({
  open,
  handleOnClose,
  profile,
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

  useEffect(() => {
    if (profile) {
      const defaultOfEditIdentityFront = defaultValueEditIdentityFront;

      if (profile.identityFront) {
        defaultOfEditIdentityFront.identityFront = profile.identityFront;
        resetEditIdentityFront(defaultOfEditIdentityFront);
      }
    }
  }, [profile, resetEditIdentityFront]);

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
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth>
      <DialogTitle>Cập nhật mặt trước CMND</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmitEditIdentityFront(handleSubmitIdentityFront)}
        >
          <Typography sx={SX_FORM_LABEL}>Căn cước công dân (trước)</Typography>
          <FormInput
            control={controlEditIdentityFront}
            name={EDIT_IMAGE_PROFILE_FIELDS.identityFront}
            variant="image"
          />
          <Box mt={4}>
            <Button customVariant="normal" type="submit" size="small">
              Cập nhật
            </Button>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} variant="outlined" color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
