import { Box, Button as MuiButton, Divider, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValueEditSocialProfile } from '~/form/defaultValues';
import { EDIT_SOCIAL_PROFILE_FIELDS } from '~/form/schema';
import { EditSocialProfileFormDefault, FormInputVariant } from '~/models/form';
import { EditSocialProfilePayload } from '~/models/modelAPI/user/social';
import { FontFamily } from '~/assets/variables';
import { TRY_CATCH_AXIOS_DEFAULT_ERROR } from '~/form/message';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useGetProfile } from '~/hooks/user/useGetProfile';
import { validationSchemaEditSocialProfile } from '~/form/validation';
import accountApi from '~/api/users';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_LABEL, SX_FORM_TITLE } from './style';
import { useCheckCompleteness } from '~/hooks/mentorProfile/useCheckCompleteness';

export default function EditSocialProfileForm() {
  const { profile: dataGetProfile, refetch } = useGetProfile();
  const { refetch: refetchCheckCompleteness } = useCheckCompleteness();

  const resolverEditSocialProfile = useYupValidationResolver(
    validationSchemaEditSocialProfile
  );
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: defaultValueEditSocialProfile,
    resolver: resolverEditSocialProfile,
  });

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditSocialProfile } = useMutation({
    mutationFn: accountApi.editSocialProfile,
  });

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const toastMsgError = (error: any): string =>
    `Cập nhật không thành công: ${
      error.message ?? TRY_CATCH_AXIOS_DEFAULT_ERROR
    }`;
  const handleSubmitSuccess = async (data: EditSocialProfileFormDefault) => {
    const params: EditSocialProfilePayload = {};
    if (data.website) params.website = data.website;
    if (data.linkedinLink) params.linkedinLink = data.linkedinLink;
    if (data.facebookLink) params.facebookLink = data.facebookLink;
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditSocialProfile(params);
      handleDispatchProfile();
      refetch();
      refetchCheckCompleteness();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  interface FormFieldsSocialProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder: string;
  }

  useEffect(() => {
    if (dataGetProfile) {
      const defaults = defaultValueEditSocialProfile;
      if (dataGetProfile.website) defaults.website = dataGetProfile.website;
      if (dataGetProfile.linkedinLink)
        defaults.linkedinLink = dataGetProfile.linkedinLink;
      if (dataGetProfile.facebookLink)
        defaults.facebookLink = dataGetProfile.facebookLink;
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

  const formFieldsSocial: FormFieldsSocialProps[] = [
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.website,
      label: 'Trang web cá nhân',
      placeholder: 'Nhập link trang web riêng',
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.linkedinLink,
      label: 'LinkedIn',
      placeholder: 'Nhập link LinkedIn',
      variant: 'text',
    },
    {
      name: EDIT_SOCIAL_PROFILE_FIELDS.facebookLink,
      label: 'Facebook',
      placeholder: 'Nhập link Facebook',
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
            disabled={!formState.isDirty}
            sx={{ fontFamily: FontFamily.bold }}
          >
            Cập nhật
          </MuiButton>
        </Box>
      </form>
    </Box>
  );
}
