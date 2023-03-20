import { Box, Divider, Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { defaultValueEditImageProfile } from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import {
  EditImageProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { RootState } from '~/redux/store';
import { validationSchemaEditImageProfile } from '~/form/validation';
import accountApi, { EditImageProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditImageProfileForm() {
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

  const resolverEditImageProfile = useYupValidationResolver(
    validationSchemaEditImageProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditImageProfile,
    resolver: resolverEditImageProfile,
  });

  useEffect(() => {
    if (dataGetProfile) {
      const defaults = defaultValueEditImageProfile;
      if (dataGetProfile.avatar) defaults.avatar = dataGetProfile.avatar;
      if (dataGetProfile.identityFront)
        defaults.identityFront = dataGetProfile.identityFront;
      if (dataGetProfile.identityBack)
        defaults.identityBack = dataGetProfile.identityBack;
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

  // const queryClient = useQueryClient();
  const { mutateAsync: mutateEditImageProfile } = useMutation({
    mutationFn: accountApi.editImageProfile,
  });

  const handleSubmitSuccess = async (data: EditImageProfileFormDataPayload) => {
    console.log(data);
    const params: EditImageProfilePayload = {
      avatar: data.avatar,
    };
    if (data.identityFront) params.identityFront = data.identityFront;
    if (data.identityBack) params.identityBack = data.identityBack;
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditImageProfile(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    }
  };

  interface FormFieldsImageProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder?: string;
    size: number;
  }

  const EDIT_IMAGE_PROFILE_FORM_TEXT = {
    TITLE: 'Thông tin ảnh và CMND',
    AVATAR: {
      LABEL: 'Avatar',
    },
    IDENTITY_FRONT: {
      LABEL: 'Căn cước công dân (mặt trước)',
    },
    IDENTITY_BACK: {
      LABEL: 'Căn cước công dân (mặt sau)',
    },
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsImage: FormFieldsImageProps[] = [
    {
      name: EDIT_IMAGE_PROFILE_FIELDS.avatar,
      label: EDIT_IMAGE_PROFILE_FORM_TEXT.AVATAR.LABEL,
      variant: 'image',
      size: 12,
    },
    {
      name: EDIT_IMAGE_PROFILE_FIELDS.identityFront,
      label: EDIT_IMAGE_PROFILE_FORM_TEXT.IDENTITY_FRONT.LABEL,
      placeholder: '',
      variant: 'image',
      size: 6,
    },
    {
      name: EDIT_IMAGE_PROFILE_FIELDS.identityBack,
      label: EDIT_IMAGE_PROFILE_FORM_TEXT.IDENTITY_BACK.LABEL,
      placeholder: '',
      variant: 'image',
      size: 6,
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_IMAGE_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      {dataGetProfile && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container columnSpacing={3}>
            {formFieldsImage.map((field) => (
              <Grid item xs={field.size} key={field.name}>
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
          <Box mt={4}>
            <Button customVariant="normal" type="submit">
              {EDIT_IMAGE_PROFILE_FORM_TEXT.BUTTON_TEXT}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}
