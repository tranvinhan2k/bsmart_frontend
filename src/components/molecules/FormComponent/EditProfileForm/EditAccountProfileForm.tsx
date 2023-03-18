import { Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { defaultValueEditAccountProfile } from '~/form/defaultValues';
import { EDIT_PROFILE_FIELDS } from '~/form/schema';
import {
  EditAccountProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { validationSchemaEditAccountProfile } from '~/form/validation';
import accountApi, { EditAccountProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditAccountProfileForm() {
  const resolverEditAccountProfile = useYupValidationResolver(
    validationSchemaEditAccountProfile
  );
  const editAccountProfileHookForm = useForm({
    defaultValues: defaultValueEditAccountProfile,
    resolver: resolverEditAccountProfile,
  });

  const { mutateAsync: mutateEditAccountProfile } = useMutation({
    mutationFn: accountApi.editAccountProfile,
  });

  const handleSubmitSuccess = async (
    data: EditAccountProfileFormDataPayload
  ) => {
    const params: EditAccountProfilePayload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditAccountProfile(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật không thành công: ${error.message}`
      );
    }
  };

  interface FormFieldsPersonalProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder: string;
  }

  const EDIT_ACCOUNT_PROFILE_FORM_TEXT = {
    TITLE: 'Thông tin tài khoản',
    OLD_PASSWORD: {
      LABEL: 'Mật khẩu hiện tại',
      PLACEHOLDER: 'Mật khẩu hiện tại',
    },
    OLD_PASSWORD_CONFIRM: {
      LABEL: 'Xác nhận mật khẩu hiện tại',
      PLACEHOLDER: 'Nhập xác nhận mật khẩu hiện tại',
    },
    NEW_PASSWORD: {
      LABEL: 'Mật khẩu mới',
      PLACEHOLDER: 'Mật khẩu mới',
    },
    NEW_PASSWORD_CONFIRM: {
      LABEL: 'Xác nhận mật khẩu mới',
      PLACEHOLDER: 'Nhập mật khẩu mới',
    },
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsPersonal: FormFieldsPersonalProps[] = [
    {
      name: EDIT_PROFILE_FIELDS.oldPassword,
      label: EDIT_ACCOUNT_PROFILE_FORM_TEXT.OLD_PASSWORD.LABEL,
      placeholder: EDIT_ACCOUNT_PROFILE_FORM_TEXT.OLD_PASSWORD.PLACEHOLDER,
      variant: 'password',
    },
    {
      name: EDIT_PROFILE_FIELDS.oldPasswordConfirm,
      label: EDIT_ACCOUNT_PROFILE_FORM_TEXT.OLD_PASSWORD_CONFIRM.LABEL,
      placeholder:
        EDIT_ACCOUNT_PROFILE_FORM_TEXT.OLD_PASSWORD_CONFIRM.PLACEHOLDER,
      variant: 'password',
    },
    {
      name: EDIT_PROFILE_FIELDS.newPassword,
      label: EDIT_ACCOUNT_PROFILE_FORM_TEXT.NEW_PASSWORD.LABEL,
      placeholder: EDIT_ACCOUNT_PROFILE_FORM_TEXT.NEW_PASSWORD.PLACEHOLDER,
      variant: 'password',
    },
    {
      name: EDIT_PROFILE_FIELDS.newPasswordConfirm,
      label: EDIT_ACCOUNT_PROFILE_FORM_TEXT.NEW_PASSWORD_CONFIRM.LABEL,
      placeholder:
        EDIT_ACCOUNT_PROFILE_FORM_TEXT.NEW_PASSWORD_CONFIRM.PLACEHOLDER,
      variant: 'password',
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_ACCOUNT_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <form
        onSubmit={editAccountProfileHookForm.handleSubmit(handleSubmitSuccess)}
      >
        {formFieldsPersonal.map((field) => (
          <Fragment key={field.name}>
            <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
            <FormInput
              control={editAccountProfileHookForm.control}
              name={field.name}
              variant={field.variant}
              placeholder={field.placeholder}
            />
          </Fragment>
        ))}
        <Box mt={4}>
          <Button customVariant="normal" type="submit">
            {EDIT_ACCOUNT_PROFILE_FORM_TEXT.BUTTON_TEXT}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
