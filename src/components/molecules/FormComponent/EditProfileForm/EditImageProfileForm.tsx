import { Box, Divider, Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  defaultValueEditAvatar,
  defaultValueEditIdentityFront,
  defaultValueEditIdentityBack,
} from '~/form/defaultValues';
import { EDIT_IMAGE_PROFILE_FIELDS } from '~/form/schema';
import {
  EditAvatarFormDataPayload,
  EditIdentityFrontFormDataPayload,
  EditIdentityBackFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { RootState } from '~/redux/store';
import {
  validationSchemaEditAvatar,
  validationSchemaEditIdentityFront,
  validationSchemaEditIdentityBack,
} from '~/form/validation';
import { useMutationEditAvatar } from '~/hooks/useMutationEditAvatar';
import { useMutationEditIdentityBack } from '~/hooks/useMutationEditIdentityBack';
import { useMutationEditIdentityFront } from '~/hooks/useMutationEditIdentityFront';
import { useYupValidationResolver } from '~/hooks';
import accountApi, { EditImageProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
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

  const resolverEditAvatar = useYupValidationResolver(
    validationSchemaEditAvatar
  );
  const resolverEditIdentityFront = useYupValidationResolver(
    validationSchemaEditIdentityFront
  );
  const resolverEditIdentityBack = useYupValidationResolver(
    validationSchemaEditIdentityBack
  );

  const {
    control: controlEditAvatar,
    handleSubmit: handleSubmitEditAvatar,
    reset: resetEditAvatar,
  } = useForm({
    defaultValues: defaultValueEditAvatar,
    resolver: resolverEditAvatar,
  });
  const {
    control: controlEditIdentityFront,
    handleSubmit: handleSubmitEditIdentityFront,
    reset: resetEditIdentityFront,
  } = useForm({
    defaultValues: defaultValueEditIdentityFront,
    resolver: resolverEditIdentityFront,
  });
  const {
    control: controlEditIdentityBack,
    handleSubmit: handleSubmitEditIdentityBack,
    reset: resetEditIdentityBack,
  } = useForm({
    defaultValues: defaultValueEditIdentityBack,
    resolver: resolverEditIdentityBack,
  });

  useEffect(() => {
    if (dataGetProfile) {
      const defaultOfEditAvatar = defaultValueEditAvatar;
      const defaultOfEditIdentityFront = defaultValueEditIdentityFront;
      const defaultOfEditEditIdentityBack = defaultValueEditIdentityBack;

      if (dataGetProfile.avatar) {
        defaultOfEditAvatar.avatar = dataGetProfile.avatar;
        resetEditAvatar(defaultOfEditAvatar);
      }
      if (dataGetProfile.identityFront) {
        defaultOfEditIdentityFront.identityFront = dataGetProfile.identityFront;
        resetEditIdentityFront(defaultOfEditIdentityFront);
      }
      if (dataGetProfile.identityBack) {
        defaultOfEditEditIdentityBack.identityBack =
          dataGetProfile.identityBack;
        resetEditIdentityBack(defaultOfEditEditIdentityBack);
      }
    }
  }, [
    dataGetProfile,
    resetEditAvatar,
    resetEditIdentityFront,
    resetEditIdentityBack,
  ]);

  const { mutateAsync: mutateEditAvatar } = useMutationEditAvatar();
  const { mutateAsync: mutateEditIdentityFront } =
    useMutationEditIdentityFront();
  const { mutateAsync: mutateEditIdentityBack } = useMutationEditIdentityBack();

  const handleSubmitAvatar = async (data: EditAvatarFormDataPayload) => {
    const params: EditImageProfilePayload = {
      imageType: 'AVATAR',
      file: data.avatar,
    };
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditAvatar(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật không thành công: ${error.message}`
      );
    }
  };

  const handleSubmitIdentityFront = async (
    data: EditIdentityFrontFormDataPayload
  ) => {
    const params: EditImageProfilePayload = {
      imageType: 'FRONTCI',
      file: data.identityFront,
    };
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditIdentityFront(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật không thành công: ${error.message}`
      );
    }
  };

  const handleSubmitIdentityBack = async (
    data: EditIdentityBackFormDataPayload
  ) => {
    const params: EditImageProfilePayload = {
      file: data.identityBack,
      imageType: 'BACKCI',
    };
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditIdentityBack(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật không thành công: ${error.message}`
      );
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
      LABEL: 'Căn cước công dân (trước)',
    },
    IDENTITY_BACK: {
      LABEL: 'Căn cước công dân (sau)',
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
        <Grid container columnSpacing={3}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmitEditAvatar(handleSubmitAvatar)}>
              <Typography sx={SX_FORM_LABEL}>
                {EDIT_IMAGE_PROFILE_FORM_TEXT.AVATAR.LABEL}
              </Typography>
              <FormInput
                control={controlEditAvatar}
                name={EDIT_IMAGE_PROFILE_FIELDS.avatar}
                variant="image"
              />
              <Box mt={4}>
                <Button customVariant="normal" type="submit">
                  {EDIT_IMAGE_PROFILE_FORM_TEXT.BUTTON_TEXT}
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmitEditIdentityFront(
                handleSubmitIdentityFront
              )}
            >
              <Typography sx={SX_FORM_LABEL}>
                {EDIT_IMAGE_PROFILE_FORM_TEXT.IDENTITY_FRONT.LABEL}
              </Typography>
              <FormInput
                control={controlEditIdentityFront}
                name={EDIT_IMAGE_PROFILE_FIELDS.identityFront}
                variant="image"
              />
              <Box mt={4}>
                <Button customVariant="normal" type="submit">
                  {EDIT_IMAGE_PROFILE_FORM_TEXT.BUTTON_TEXT}
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmitEditIdentityBack(handleSubmitIdentityBack)}
            >
              <Typography sx={SX_FORM_LABEL}>
                {EDIT_IMAGE_PROFILE_FORM_TEXT.IDENTITY_BACK.LABEL}
              </Typography>
              <FormInput
                control={controlEditIdentityBack}
                name={EDIT_IMAGE_PROFILE_FIELDS.identityBack}
                variant="image"
              />
              <Box mt={4}>
                <Button customVariant="normal" type="submit">
                  {EDIT_IMAGE_PROFILE_FORM_TEXT.BUTTON_TEXT}
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
