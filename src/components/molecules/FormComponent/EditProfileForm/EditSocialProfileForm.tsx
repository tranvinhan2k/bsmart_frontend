import { Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { defaultValueEditSocialProfile } from '~/form/defaultValues';
import { EDIT_SOCIAL_PROFILE_FIELDS } from '~/form/schema';
import {
  EditSocialProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { validationSchemaEditSocialProfile } from '~/form/validation';
import accountApi, { EditSocialProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditSocialProfileForm() {
  const resolverEditSocialProfile = useYupValidationResolver(
    validationSchemaEditSocialProfile
  );
  const editProfileHookForm = useForm({
    defaultValues: defaultValueEditSocialProfile,
    resolver: resolverEditSocialProfile,
  });

  const { mutateAsync: mutateEditSocialProfile } = useMutation({
    mutationFn: accountApi.editSocialProfile,
  });

  const handleSubmitSuccess = async (
    data: EditSocialProfileFormDataPayload
  ) => {
    const params: EditSocialProfilePayload = {
      facebookLink: data.facebookLink,
      twitterLink: data.twitterLink,
      instagramLink: data.instagramLink,
    };
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditSocialProfile(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    }
  };

  interface FormFieldsSocialProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder: string;
  }

  const EDIT_SOCIAL_PROFILE_FORM_TEXT = {
    TITLE: 'Liên kết mạng xã hội',
    FACEBOOK_LINK: {
      LABEL: 'Facebook',
      PLACEHOLDER: 'Nhập link Facebook',
    },
    TWITTER_LINK: {
      LABEL: 'Twitter',
      PLACEHOLDER: 'Nhập link Twitter',
    },
    INSTAGRAM_LINK: {
      LABEL: 'Instagram',
      PLACEHOLDER: 'Nhập link Instagram',
    },
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsSocial: FormFieldsSocialProps[] = [
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.facebookLink,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.FACEBOOK_LINK.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.FACEBOOK_LINK.PLACEHOLDER,
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.twitterLink,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.TWITTER_LINK.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.TWITTER_LINK.PLACEHOLDER,
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.instagramLink,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.INSTAGRAM_LINK.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.INSTAGRAM_LINK.PLACEHOLDER,
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
