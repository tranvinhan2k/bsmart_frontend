import { Box, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';
import { defaultValueEditAccountProfile } from '~/form/defaultValues';
import { EDIT_PROFILE_FIELDS } from '~/form/schema';
import {
  EditAccountProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { validationSchemaEditAccountProfile } from '~/form/validation';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';
import { useYupValidationResolver } from '~/hooks';

export default function EditAccountProfileForm() {
  const resolverEditAccountProfile = useYupValidationResolver(
    validationSchemaEditAccountProfile
  );
  const editAccountProfileHookForm = useForm({
    defaultValues: defaultValueEditAccountProfile,
    resolver: resolverEditAccountProfile,
  });

  const handleSubmitSuccess = (data: EditAccountProfileFormDataPayload) => {
    // TODO: handle submit form
  };

  interface FormFieldsPersonalProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder: string;
  }

  const EDIT_ACCOUNT_PROFILE_FORM_TEXT = {
    TITLE: 'Thông tin tài khoản',
    EMAIL: {
      LABEL: 'Email',
      PLACEHOLDER: 'Nhập Email',
    },
    PASSWORD: {
      LABEL: 'Mật khẩu',
      PLACEHOLDER: 'Nhập Mật khẩu',
    },
    CONFIRM: {
      LABEL: 'Nhập lại mật khẩu',
      PLACEHOLDER: 'Nhập lại mật khẩu',
    },
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsPersonal: FormFieldsPersonalProps[] = [
    {
      name: EDIT_PROFILE_FIELDS.email,
      label: EDIT_ACCOUNT_PROFILE_FORM_TEXT.EMAIL.LABEL,
      placeholder: EDIT_ACCOUNT_PROFILE_FORM_TEXT.EMAIL.PLACEHOLDER,
      variant: 'text',
    },
    {
      name: EDIT_PROFILE_FIELDS.password,
      label: EDIT_ACCOUNT_PROFILE_FORM_TEXT.PASSWORD.LABEL,
      placeholder: EDIT_ACCOUNT_PROFILE_FORM_TEXT.PASSWORD.PLACEHOLDER,
      variant: 'password',
    },
    {
      name: EDIT_PROFILE_FIELDS.confirm,
      label: EDIT_ACCOUNT_PROFILE_FORM_TEXT.PASSWORD.LABEL,
      placeholder: EDIT_ACCOUNT_PROFILE_FORM_TEXT.CONFIRM.PLACEHOLDER,
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
        <Button customVariant="normal" type="submit">
          {EDIT_ACCOUNT_PROFILE_FORM_TEXT.BUTTON_TEXT}
        </Button>
      </form>
    </Box>
  );
}
