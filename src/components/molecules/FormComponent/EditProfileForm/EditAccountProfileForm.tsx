import { Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { defaultValueEditAccountProfile } from '~/form/defaultValues';
import { EDIT_PROFILE_FIELDS } from '~/form/schema';
import { EditAccountProfileFormDefault, FormInputVariant } from '~/models/form';
import { EditAccountProfilePayload } from '~/models/modelAPI/user/account';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditAccountProfile } from '~/form/validation';
import accountApi from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

const toastMsgLoading = 'Đang cập nhật ...';
const toastMsgSuccess = 'Cập nhật thành công ...';
const toastMsgError = (error: any): string => {
  return `Cập nhật không thành công: ${error.message}`;
};

export default function EditAccountProfileForm() {
  const resolverEditAccountProfile = useYupValidationResolver(
    validationSchemaEditAccountProfile
  );
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValueEditAccountProfile,
    resolver: resolverEditAccountProfile,
  });

  const { mutateAsync: mutateEditAccountProfile } = useMutation({
    mutationFn: accountApi.editAccountProfile,
  });

  const handleSubmitSuccess = async (data: EditAccountProfileFormDefault) => {
    const params: EditAccountProfilePayload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditAccountProfile(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  interface FormFieldsPersonalProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder: string;
  }

  const formFieldsPersonal: FormFieldsPersonalProps[] = [
    {
      name: EDIT_PROFILE_FIELDS.oldPassword,
      label: 'Mật khẩu hiện tại',
      placeholder: 'Nhập mật khẩu hiện tại',
      variant: 'password',
    },
    {
      name: EDIT_PROFILE_FIELDS.oldPasswordConfirm,
      label: 'Xác nhận mật khẩu hiện tại',
      placeholder: 'Nhập xác nhận mật khẩu hiện tại',
      variant: 'password',
    },
    {
      name: EDIT_PROFILE_FIELDS.newPassword,
      label: 'Mật khẩu mới',
      placeholder: 'Nhập mật khẩu mới',
      variant: 'password',
    },
    {
      name: EDIT_PROFILE_FIELDS.newPasswordConfirm,
      label: 'Xác nhận mật khẩu mới',
      placeholder: 'Nhập xác nhận mật khẩu mới',
      variant: 'password',
    },
    {
      name: 'date',
      label: 'Ngày sinh',
      placeholder: 'Nhập ngày sinh',
      variant: 'date',
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Thông tin tài khoản
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <form onSubmit={handleSubmit(handleSubmitSuccess)}>
        {formFieldsPersonal.map((field) => (
          <Fragment key={field.name}>
            <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
            <FormInput
              control={control}
              name={field.name}
              variant={field.variant}
              placeholder={field.placeholder}
            />
          </Fragment>
        ))}
        <Box mt={4}>
          <Button customVariant="normal" type="submit">
            Cập nhật
          </Button>
        </Box>
      </form>
    </Box>
  );
}
