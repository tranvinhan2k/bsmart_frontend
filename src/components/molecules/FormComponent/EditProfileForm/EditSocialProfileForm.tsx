import { Box, Divider, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
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
import { RootState } from '~/redux/store';
import toast from '~/utils/toast';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditSocialProfileForm() {
  const resolverEditSocialProfile = useYupValidationResolver(
    validationSchemaEditSocialProfile
  );
  const {
    // editProfileHookForm
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: defaultValueEditSocialProfile,
    resolver: resolverEditSocialProfile,
  });
  const { mutateAsync: mutateEditSocialProfile } = useMutation({
    mutationFn: accountApi.editSocialProfile,
  });

  const handleSubmitSuccess = async (
    data: EditSocialProfileFormDataPayload
  ) => {
    // const params: EditSocialProfilePayload = {
    //   facebookLink: data.facebookLink,
    //   twitterLink: data.twitterLink,
    //   instagramLink: data.instagramLink,
    // };
    const params: EditSocialProfilePayload = {};
    if (data.facebookLink) params.facebookLink = data.facebookLink;
    if (data.twitterLink) params.twitterLink = data.twitterLink;
    if (data.instagramLink) params.instagramLink = data.instagramLink;
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
    defaultValue: string | undefined;
    placeholder: string;
  }

  const token =
    useSelector((state: RootState) => state.user.token) ||
    localStorage.getItem('token');
  const queryKey = ['/loginUser'];
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data: dataGetProfile } = useQuery(
    queryKey,
    () => accountApi.getProfile(config),
    {
      enabled: Boolean(token),
    }
  );

  useEffect(() => {
    if (dataGetProfile) {
      const defaults = {
        facebookLink: dataGetProfile.facebookLink,
        twitterLink: dataGetProfile.twitterLink,
        instagramLink: dataGetProfile.instagramLink,
      };
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

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
      defaultValue: dataGetProfile ? dataGetProfile.facebookLink : '',
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.twitterLink,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.TWITTER_LINK.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.TWITTER_LINK.PLACEHOLDER,
      defaultValue: dataGetProfile ? dataGetProfile.twitterLink : '',
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.instagramLink,
      label: EDIT_SOCIAL_PROFILE_FORM_TEXT.INSTAGRAM_LINK.LABEL,
      placeholder: EDIT_SOCIAL_PROFILE_FORM_TEXT.INSTAGRAM_LINK.PLACEHOLDER,
      defaultValue: dataGetProfile ? dataGetProfile.instagramLink : '',
      variant: 'text',
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_SOCIAL_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <form onSubmit={handleSubmit(handleSubmitSuccess)}>
        {formFieldsSocial.map((field) => (
          <Fragment key={field.name}>
            <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
            <FormInput
              variant={field.variant}
              control={control}
              name={field.name}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
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
