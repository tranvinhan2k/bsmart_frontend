import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { defaultValueEditAccountProfile } from '~/form/defaultValues';
import { EDIT_PROFILE_FIELDS } from '~/form/schema';
import { EditAccountProfilePayload } from '~/models/modelAPI/user/account';
import { EditPasswordSectionDefault, FormInputVariant } from '~/models/form';
import { FontFamily } from '~/assets/variables';
import { useMutationEditAccountProfile } from '~/hooks/useMutationEditAccountProfile';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { validationSchemaEditAccountProfile } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { toastMsgError } from '~/utils/common';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function DisplayEditPasswordSection() {
  const resolverEditAccountProfile = useYupValidationResolver(
    validationSchemaEditAccountProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditAccountProfile,
    resolver: resolverEditAccountProfile,
  });

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
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
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
      reset();
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
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Thông tin mật khẩu
      </Typography>
      <Divider sx={{ marginY: 2 }} />
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
        </Stack>
      </form>
    </Box>
  );
}
