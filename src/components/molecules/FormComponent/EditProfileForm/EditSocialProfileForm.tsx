import { Box, Button as MuiButton, Divider, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { defaultValueEditSocialProfile } from '~/form/defaultValues';
import { EDIT_SOCIAL_PROFILE_FIELDS } from '~/form/schema';
import { EditSocialProfileFormDefault, FormInputVariant } from '~/models/form';
import { EditSocialProfilePayload } from '~/models/modelAPI/user/social';
import { RootState } from '~/redux/store';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditSocialProfile } from '~/form/validation';
import { FontFamily } from '~/assets/variables';
import accountApi from '~/api/users';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

const toastMsgLoading = 'Đang cập nhật ...';
const toastMsgSuccess = 'Cập nhật thành công ...';
const toastMsgError = (error: any): string => {
  return `Cập nhật không thành công: ${error.message}`;
};

export default function EditSocialProfileForm() {
  const resolverEditSocialProfile = useYupValidationResolver(
    validationSchemaEditSocialProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditSocialProfile,
    resolver: resolverEditSocialProfile,
  });
  const { mutateAsync: mutateEditSocialProfile } = useMutation({
    mutationFn: accountApi.editSocialProfile,
  });

  const handleSubmitSuccess = async (data: EditSocialProfileFormDefault) => {
    const params: EditSocialProfilePayload = {};
    if (data.facebookLink) params.facebookLink = data.facebookLink;
    if (data.twitterLink) params.twitterLink = data.twitterLink;
    if (data.instagramLink) params.instagramLink = data.instagramLink;
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditSocialProfile(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  interface FormFieldsSocialProps {
    name: string;
    variant: FormInputVariant;
    label: string;
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
      const defaults = defaultValueEditSocialProfile;
      if (dataGetProfile.facebookLink)
        defaults.facebookLink = dataGetProfile.facebookLink;
      if (dataGetProfile.twitterLink)
        defaults.twitterLink = dataGetProfile.twitterLink;
      if (dataGetProfile.instagramLink)
        defaults.instagramLink = dataGetProfile.instagramLink;
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

  const formFieldsSocial: FormFieldsSocialProps[] = [
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.facebookLink,
      label: 'Facebook',
      placeholder: 'Nhập link Facebook',
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.twitterLink,
      label: 'Twitter',
      placeholder: 'Nhập link Twitter',
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.instagramLink,
      label: 'Instagram',
      placeholder: 'Nhập link Instagram',
      variant: 'text',
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Liên kết mạng xã hội
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
            />
          </Fragment>
        ))}
        <Box mt={4}>
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
        </Box>
      </form>
    </Box>
  );
}
