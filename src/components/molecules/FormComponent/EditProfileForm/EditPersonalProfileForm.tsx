import { Box, Divider, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { defaultValueEditPersonalProfile } from '~/form/defaultValues';
import { EDIT_PERSONAL_PROFILE_FIELDS } from '~/form/schema';
import {
  EditPersonalProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { validationSchemaEditPersonalProfile } from '~/form/validation';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditPersonalProfileForm() {
  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditPersonalProfile
  );
  const editProfileHookForm = useForm({
    defaultValues: defaultValueEditPersonalProfile,
    resolver: resolverEditPersonalProfile,
  });

  const handleSubmitSuccess = (data: EditPersonalProfileFormDataPayload) => {
    // TODO: handle submit form
  };

  interface FormFieldsPersonalProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder?: string;
    size: number;
  }

  const EDIT_PERSONAL_PROFILE_FORM_TEXT = {
    TITLE: 'Thông tin cá nhân',
    AVATAR: {
      LABEL: 'Avatar',
    },
    NAME: {
      LABEL: 'Họ tên',
      PLACEHOLDER: 'Nhập họ tên',
    },
    BIRTHDAY: {
      LABEL: 'Ngày sinh',
      PLACEHOLDER: 'Nhập ngày sinh',
    },
    ADDRESS: {
      LABEL: 'Địa chỉ',
      PLACEHOLDER: 'Nhập địa chỉ',
    },
    PHONE: {
      LABEL: 'Số điện thoại',
      PLACEHOLDER: 'Nhập số điện thoại',
    },
    IDENTITY_FRONT: {
      LABEL: 'Căn cước công dân (mặt trước)',
    },
    IDENTITY_BACK: {
      LABEL: 'Căn cước công dân (mặt sau)',
    },
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsPersonal: FormFieldsPersonalProps[] = [
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.avatar,
      label: EDIT_PERSONAL_PROFILE_FORM_TEXT.AVATAR.LABEL,
      variant: 'image',
      size: 6,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.name,
      label: EDIT_PERSONAL_PROFILE_FORM_TEXT.NAME.LABEL,
      placeholder: EDIT_PERSONAL_PROFILE_FORM_TEXT.NAME.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.birthday,
      label: EDIT_PERSONAL_PROFILE_FORM_TEXT.BIRTHDAY.LABEL,
      placeholder: EDIT_PERSONAL_PROFILE_FORM_TEXT.BIRTHDAY.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.address,
      label: EDIT_PERSONAL_PROFILE_FORM_TEXT.ADDRESS.LABEL,
      placeholder: EDIT_PERSONAL_PROFILE_FORM_TEXT.ADDRESS.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.phone,
      label: EDIT_PERSONAL_PROFILE_FORM_TEXT.PHONE.LABEL,
      placeholder: EDIT_PERSONAL_PROFILE_FORM_TEXT.PHONE.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.identityFront,
      label: EDIT_PERSONAL_PROFILE_FORM_TEXT.IDENTITY_FRONT.LABEL,
      placeholder: '',
      variant: 'image',
      size: 6,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.identityBack,
      label: EDIT_PERSONAL_PROFILE_FORM_TEXT.IDENTITY_BACK.LABEL,
      placeholder: '',
      variant: 'image',
      size: 6,
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_PERSONAL_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <form onSubmit={editProfileHookForm.handleSubmit(handleSubmitSuccess)}>
        <Grid container columnSpacing={3}>
          {formFieldsPersonal.map((field) => (
            <Grid item xs={field.size} key={field.name}>
              <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
              <FormInput
                control={editProfileHookForm.control}
                name={field.name}
                variant={field.variant}
                placeholder={field.placeholder}
              />
            </Grid>
          ))}
        </Grid>
        <Button customVariant="normal" type="submit">
          {EDIT_PERSONAL_PROFILE_FORM_TEXT.BUTTON_TEXT}
        </Button>
      </form>
    </Box>
  );
}
