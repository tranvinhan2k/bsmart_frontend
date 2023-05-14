import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import {
  defaultValueEditIdentityFront,
  defaultValueEditIdentityBack,
} from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import {
  EditIdentityFrontFormDataPayload,
  EditIdentityBackFormDataPayload,
} from '~/models/form';
import { EditImageProfilePayload } from '~/api/users';
import { ProfileImgType } from '~/constants/profile';
import { useMutationEditIdentityBack } from '~/hooks/useMutationEditIdentityBack';
import { useMutationEditIdentityFront } from '~/hooks/useMutationEditIdentityFront';
import { useYupValidationResolver } from '~/hooks';
import {
  validationSchemaEditIdentityFront,
  validationSchemaEditIdentityBack,
} from '~/form/validation';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM_LABEL } from '../style';

interface DialogUpdateIdCardProps {
  open: boolean;
  handleOnClose: () => void;
  dataGetProfile: any;
}

export default function DialogUpdateIdCard({
  open,
  handleOnClose,
  dataGetProfile,
}: DialogUpdateIdCardProps) {
  const resolverEditIdentityFront = useYupValidationResolver(
    validationSchemaEditIdentityFront
  );
  const resolverEditIdentityBack = useYupValidationResolver(
    validationSchemaEditIdentityBack
  );

  const {
    control: controlEditIdentityFront,
    handleSubmit: handleSubmitEditIdentityFront,
    reset: resetEditIdentityFront,
  } = useForm({
    defaultValues: defaultValueEditIdentityFront,
    resolver: resolverEditIdentityFront,
  });
  const {
    control: controlEditIdentityBack,
    handleSubmit: handleSubmitEditIdentityBack,
    reset: resetEditIdentityBack,
  } = useForm({
    defaultValues: defaultValueEditIdentityBack,
    resolver: resolverEditIdentityBack,
  });

  useEffect(() => {
    if (dataGetProfile) {
      const defaultOfEditIdentityFront = defaultValueEditIdentityFront;
      const defaultOfEditEditIdentityBack = defaultValueEditIdentityBack;

      if (dataGetProfile.identityFront) {
        defaultOfEditIdentityFront.identityFront = dataGetProfile.identityFront;
        resetEditIdentityFront(defaultOfEditIdentityFront);
      }
      if (dataGetProfile.identityBack) {
        defaultOfEditEditIdentityBack.identityBack =
          dataGetProfile.identityBack;
        resetEditIdentityBack(defaultOfEditEditIdentityBack);
      }
    }
  }, [dataGetProfile, resetEditIdentityFront, resetEditIdentityBack]);

  const { mutateAsync: mutateEditIdentityFront } =
    useMutationEditIdentityFront();
  const { mutateAsync: mutateEditIdentityBack } = useMutationEditIdentityBack();

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

  const handleSubmitIdentityBack = async (
    data: EditIdentityBackFormDataPayload
  ) => {
    const params: EditImageProfilePayload = {
      file: data.identityBack,
      imageType: ProfileImgType.BACKCI,
    };
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditIdentityBack(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật không thành công: ${error.message}`
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth="lg">
      <DialogTitle>Cập nhật CMND</DialogTitle>
      <DialogContent>
        <Grid container columnSpacing={3}>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmitEditIdentityFront(
                handleSubmitIdentityFront
              )}
            >
              <Typography sx={SX_FORM_LABEL}>
                Căn cước công dân (trước)
              </Typography>
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
          </Grid>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmitEditIdentityBack(handleSubmitIdentityBack)}
            >
              <Typography sx={SX_FORM_LABEL}>
                Căn cước công dân (sau)
              </Typography>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} variant="outlined" color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
