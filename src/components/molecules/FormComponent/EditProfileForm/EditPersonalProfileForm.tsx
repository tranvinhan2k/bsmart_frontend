import { Box, Divider, Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { defaultValueEditPersonalProfile } from '~/form/defaultValues';
import {
  EDIT_MEMBER_PERSONAL_PROFILE_FIELDS,
  EDIT_MENTOR_PERSONAL_PROFILE_FIELDS,
} from '~/form/schema';
import {
  EditPersonalProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { RootState } from '~/redux/store';
import { validationSchemaEditPersonalProfile } from '~/form/validation';
import accountApi, { EditPersonalProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

export default function EditPersonalProfileForm() {
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

  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditPersonalProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditPersonalProfile,
    resolver: resolverEditPersonalProfile,
  });

  useEffect(() => {
    if (dataGetProfile) {
      const defaults = defaultValueEditPersonalProfile;
      if (dataGetProfile.avatar) defaults.avatar = dataGetProfile.avatar;
      if (dataGetProfile.fullName) defaults.fullName = dataGetProfile.fullName;
      if (dataGetProfile.birthday) defaults.birthday = dataGetProfile.birthday;
      if (dataGetProfile.address) defaults.address = dataGetProfile.address;
      if (dataGetProfile.phone) defaults.phone = dataGetProfile.phone;
      if (dataGetProfile.identityFront)
        defaults.identityFront = dataGetProfile.identityFront;
      if (dataGetProfile.identityBack)
        defaults.identityBack = dataGetProfile.identityBack;
      if (dataGetProfile.introduce)
        defaults.introduce = dataGetProfile.introduce;
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

  // const queryClient = useQueryClient();
  const { mutateAsync: mutateEditPersonalProfile } = useMutation({
    mutationFn:
      dataGetProfile && dataGetProfile.roles[0].code === 'TEACHER'
        ? accountApi.editMentorPersonalProfile
        : accountApi.editMemberPersonalProfile,
  });

  const handleSubmitSuccess = async (
    data: EditPersonalProfileFormDataPayload
  ) => {
    console.log(data);
    const params: EditPersonalProfilePayload = {
      fullName: data.fullName,
      birthday: data.birthday,
      address: data.address,
      phone: data.phone,
    };
    if (data.introduce) params.introduce = data.introduce;
    const id = toast.loadToast('Đang cập nhật ...');
    try {
      await mutateEditPersonalProfile(params);
      toast.updateSuccessToast(id, 'Cập nhật thành công');
    } catch (error: any) {
      toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
    }
  };

  interface FormFieldsPersonalProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder?: string;
    size: number;
  }

  const EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT = {
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

  const EDIT_PERSONAL_MENTOR_PROFILE_FORM_TEXT = Object.assign(
    EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT,
    {
      INTRODUCE: {
        LABEL: 'Giới thiệu',
        PLACEHOLDER: 'Nhập lời giới thiệu bản thân cho học sin',
      },
    }
  );

  const formFieldsMemberPersonal: FormFieldsPersonalProps[] = [
    {
      name: EDIT_MEMBER_PERSONAL_PROFILE_FIELDS.avatar,
      label: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.AVATAR.LABEL,
      variant: 'image',
      size: 12,
    },
    {
      name: EDIT_MEMBER_PERSONAL_PROFILE_FIELDS.fullName,
      label: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.NAME.LABEL,
      placeholder: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.NAME.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_MEMBER_PERSONAL_PROFILE_FIELDS.birthday,
      label: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.BIRTHDAY.LABEL,
      placeholder: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.BIRTHDAY.PLACEHOLDER,
      variant: 'date',
      size: 12,
    },
    {
      name: EDIT_MEMBER_PERSONAL_PROFILE_FIELDS.address,
      label: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.ADDRESS.LABEL,
      placeholder: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.ADDRESS.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_MEMBER_PERSONAL_PROFILE_FIELDS.phone,
      label: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.PHONE.LABEL,
      placeholder: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.PHONE.PLACEHOLDER,
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_MEMBER_PERSONAL_PROFILE_FIELDS.identityFront,
      label: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.IDENTITY_FRONT.LABEL,
      placeholder: '',
      variant: 'image',
      size: 6,
    },
    {
      name: EDIT_MEMBER_PERSONAL_PROFILE_FIELDS.identityBack,
      label: EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.IDENTITY_BACK.LABEL,
      placeholder: '',
      variant: 'image',
      size: 6,
    },
  ];

  const formFieldsMentorPersonal: FormFieldsPersonalProps[] =
    formFieldsMemberPersonal.concat({
      name: EDIT_MENTOR_PERSONAL_PROFILE_FIELDS.introduce,
      label: EDIT_PERSONAL_MENTOR_PROFILE_FORM_TEXT.INTRODUCE.LABEL,
      placeholder: EDIT_PERSONAL_MENTOR_PROFILE_FORM_TEXT.INTRODUCE.PLACEHOLDER,
      variant: 'multiline',
      size: 12,
    });

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      {dataGetProfile && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container columnSpacing={3}>
            {dataGetProfile.roles[0].code === 'TEACHER' &&
              formFieldsMentorPersonal.map((field) => (
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
            {dataGetProfile &&
              dataGetProfile.roles[0].code === 'STUDENT' &&
              formFieldsMemberPersonal.map((field) => (
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
          <Button customVariant="normal" type="submit">
            {EDIT_PERSONAL_MEMBER_PROFILE_FORM_TEXT.BUTTON_TEXT}
          </Button>
        </form>
      )}
    </Box>
  );
}
