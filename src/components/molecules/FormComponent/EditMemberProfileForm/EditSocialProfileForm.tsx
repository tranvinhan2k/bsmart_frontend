import { Box, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

import { defaultValueEditSocialProfile } from '~/form/defaultValues';
import { EDIT_SOCIAL_PROFILE_FIELDS } from '~/form/schema';
import {
  EditSocialProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { validationSchemaEditSocialProfile } from '~/form/validation';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';
import { useYupValidationResolver } from '~/hooks';

export default function EditSocialProfileForm() {
  const resolverEditSocialProfile = useYupValidationResolver(
    validationSchemaEditSocialProfile
  );
  const editProfileHookForm = useForm({
    defaultValues: defaultValueEditSocialProfile,
    resolver: resolverEditSocialProfile,
  });

  const handleSubmitSuccess = (data: EditSocialProfileFormDataPayload) => {
    // TODO: handle submit form
  };

  interface FormFieldsSocialProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder: string;
  }

  const EDIT_SOCIAL_PROFILE_FORM_TEXT = {
    TITLE: 'Liên kết mạng xã hội',
    EMAIL: {
      LABEL: 'Facebook',
      PLACEHOLDER: 'Nhập link Facebook',
    },
    PASSWORD: {
      LABEL: 'Twitter',
      PLACEHOLDER: 'Nhập link Twitter',
    },
    CONFIRM: {
      LABEL: 'Instagram',
      PLACEHOLDER: 'Nhập link Instagram',
    },
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsSocial: FormFieldsSocialProps[] = [
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.facebook,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.EMAIL.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.EMAIL.PLACEHOLDER,
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.twitter,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.PASSWORD.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.PASSWORD.PLACEHOLDER,
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.instagram,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.PASSWORD.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.CONFIRM.PLACEHOLDER,
      variant: 'text',
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_SOCIAL_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <form onSubmit={editProfileHookForm.handleSubmit(handleSubmitSuccess)}>
        {formFieldsSocial.map((field) => (
          <Fragment key={field.name}>
            <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
            <FormInput
              control={editProfileHookForm.control}
              name={field.name}
              variant={field.variant}
              placeholder={field.placeholder}
            />
          </Fragment>
        ))}
        <Button customVariant="normal" type="submit">
          {EDIT_SOCIAL_PROFILE_FORM_TEXT.BUTTON_TEXT}
        </Button>
      </form>
    </Box>
  );
}
