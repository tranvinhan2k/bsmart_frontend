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
import { defaultValueEditIdentityBack } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import { EditIdentityBackFormDataPayload } from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { ProfileImgType } from '~/constants/profile';
import { useMutationEditIdentityBack } from '~/hooks/useMutationEditIdentityBack';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditIdentityBack } from '~/form/validation';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM_LABEL } from './style';

interface DialogEditIdCardBackProps {
  open: boolean;
  handleOnClose: () => void;
  profile: any;
}

export default function DialogEditIdCardBack({
  open,
  handleOnClose,
  profile,
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

  useEffect(() => {
    if (profile) {
      const defaultOfEditEditIdentityBack = defaultValueEditIdentityBack;

      if (profile.identityBack) {
        defaultOfEditEditIdentityBack.identityBack = profile.identityBack;
        resetEditIdentityBack(defaultOfEditEditIdentityBack);
      }
    }
  }, [profile, resetEditIdentityBack]);

  const { mutateAsync: mutateEditIdentityBack } = useMutationEditIdentityBack();

  const toastMsgLoading = 'Đang cập nhật ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
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
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth>
      <DialogTitle>Cập nhật CMND</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitEditIdentityBack(handleSubmitIdentityBack)}>
          <Typography sx={SX_FORM_LABEL}>Căn cước công dân (sau)</Typography>
          <FormInput
            control={controlEditIdentityBack}
            name={EDIT_IMAGE_PROFILE_FIELDS.identityBack}
            variant="image"
            previewImgHeight={300}
            previewImgWidth={500}
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
