import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { defaultValueEditPersonalProfile } from '~/form/defaultValues';
import { EDIT_PERSONAL_PROFILE_FIELDS } from '~/form/schema';
import { EditPersonalProfilePayload } from '~/models/modelAPI/user/personal';
import { RootState } from '~/redux/store';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditPersonalProfile } from '~/form/validation';
import { FontFamily } from '~/assets/variables';
import {
  EditPersonalProfileFormDefault,
  FormInputVariant,
} from '~/models/form';
import accountApi from '~/api/users';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

const toastMsgLoading = 'Đang cập nhật ...';
const toastMsgSuccess = 'Cập nhật thành công ...';
const toastMsgError = (error: any): string => {
  return `Cập nhật không thành công: ${error.message}`;
};

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
      if (dataGetProfile.fullName) defaults.fullName = dataGetProfile.fullName;
      if (dataGetProfile.birthday) defaults.birthday = dataGetProfile.birthday;
      if (dataGetProfile.address) defaults.address = dataGetProfile.address;
      if (dataGetProfile.phone) defaults.phone = dataGetProfile.phone;
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

  const { mutateAsync: mutateEditPersonalProfile } = useMutation({
    mutationFn:
      dataGetProfile && dataGetProfile.roles[0].code === 'TEACHER'
        ? accountApi.editMentorPersonalProfile
        : accountApi.editMemberPersonalProfile,
  });

  const handleSubmitSuccess = async (data: EditPersonalProfileFormDefault) => {
    const params: EditPersonalProfilePayload = {
      fullName: data.fullName,
      birthday: data.birthday,
      address: data.address,
      phone: data.phone,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditPersonalProfile(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  interface FormFieldsPersonalProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder?: string;
    size: number;
  }

  const formFieldsPersonal: FormFieldsPersonalProps[] = [
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.fullName,
      label: 'Họ tên',
      placeholder: 'Nhập họ tên',
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.birthday,
      label: 'Ngày sinh',
      placeholder: 'Nhập ngày sinh',
      variant: 'date',
      size: 12,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.address,
      label: 'Địa chỉ',
      placeholder: 'Nhập địa chỉ',
      variant: 'text',
      size: 12,
    },
    {
      name: EDIT_PERSONAL_PROFILE_FIELDS.phone,
      label: 'Số điện thoại',
      placeholder: 'Nhập số điện thoại',
      variant: 'text',
      size: 12,
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Thông tin cá nhân
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      {dataGetProfile && (
        <form onSubmit={handleSubmit(handleSubmitSuccess)}>
          <Grid container columnSpacing={3}>
            {formFieldsPersonal.map((field) => (
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
      )}
    </Box>
  );
}
