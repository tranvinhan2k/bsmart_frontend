import {
  Button as MuiButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { defaultValueEditAccountProfile } from '~/form/defaultValues';
import { EDIT_PROFILE_FIELDS } from '~/form/schema';
import { EditPasswordSectionDefault, FormInputVariant } from '~/models/form';
import { EditAccountProfilePayload } from '~/models/modelAPI/user/account';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditAccountProfile } from '~/form/validation';
import { FontFamily } from '~/assets/variables';
import { useMutationEditAccountProfile } from '~/hooks/useMutationEditAccountProfile';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { toastMsgError } from '~/utils/common';
import { SX_FORM_LABEL } from './style';

interface DialogEditPasswordProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogEditPassword({
  open,
  handleOnClose,
}: DialogEditPasswordProps) {
  const resolverEditAccountProfile = useYupValidationResolver(
    validationSchemaEditAccountProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditAccountProfile,
    resolver: resolverEditAccountProfile,
  });

  const { mutateAsync: mutateEditAccountProfile } =
    useMutationEditAccountProfile();

  const toastMsgLoading = 'Đang cập nhật mật khẩu...';
  const toastMsgSuccess = 'Cập nhật mật khẩu thành công';
  const handleSubmitSuccess = async (data: EditPasswordSectionDefault) => {
    const params: EditAccountProfilePayload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditAccountProfile(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  interface FormFieldsPersonalProps {
    label: string;
    name: string;
    placeholder: string;
    variant: FormInputVariant;
  }

  const handleOnCloseCustom = () => {
    reset();
    handleOnClose();
  };
  const formFieldsPersonal: FormFieldsPersonalProps[] = [
    {
      label: 'Mật khẩu hiện tại',
      name: EDIT_PROFILE_FIELDS.oldPassword,
      placeholder: 'Nhập mật khẩu hiện tại',
      variant: 'password',
    },
    {
      label: 'Mật khẩu mới',
      name: EDIT_PROFILE_FIELDS.newPassword,
      placeholder: 'Nhập mật khẩu mới',
      variant: 'password',
    },
    {
      label: 'Xác nhận mật khẩu mới',
      name: EDIT_PROFILE_FIELDS.newPasswordConfirm,
      placeholder: 'Nhập xác nhận mật khẩu mới',
      variant: 'password',
    },
  ];

  return (
    <Dialog open={open} onClose={handleOnCloseCustom} fullWidth>
      <DialogTitle>Cập nhật mật khẩu</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container>
            {formFieldsPersonal.map((field) => (
              <Grid item key={field.name} xs={12}>
                <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
                <FormInput
                  control={control}
                  name={field.name}
                  variant={field.variant}
                  placeholder={field.placeholder}
                />
              </Grid>
            ))}
          </Grid>
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
