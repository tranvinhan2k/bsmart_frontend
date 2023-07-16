import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { defaultValueEditPersonalProfile } from '~/form/defaultValues';
import { EditPersonalProfileFormSubmit } from '~/models/modelAPI/user/personal';
import {
  EditPersonalProfileFormDefault,
  FormInputVariant,
} from '~/models/form';
import { FontFamily } from '~/assets/variables';
import { genderData } from '~/constants';
import { keyMentorProfileUseCheckCompleteness } from '~/hooks/mentorProfile/key';
import { selectProfile } from '~/redux/user/selector';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaEditPersonalProfile } from '~/form/validation';
import accountApi from '~/api/users';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_LABEL, SX_FORM_TITLE } from './style';

export default function EditPersonalProfileForm() {
  const profile = useSelector(selectProfile);

  const resolverEditPersonalProfile = useYupValidationResolver(
    validationSchemaEditPersonalProfile
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValueEditPersonalProfile,
    resolver: resolverEditPersonalProfile,
  });

  // const genderData: DropdownDynamicValueInputStringDataPayload[] =
  //   useMemo(() => {
  //     return [
  //       { id: 0, label: 'Nam', value: 'MALE' },
  //       { id: 1, label: 'Nữ', value: 'FEMALE' },
  //     ];
  //   }, []);

  useEffect(() => {
    if (profile) {
      if (profile.fullName)
        defaultValueEditPersonalProfile.fullName = profile.fullName;
      if (profile.birthday)
        defaultValueEditPersonalProfile.birthday = profile.birthday;
      if (profile.address)
        defaultValueEditPersonalProfile.address = profile.address;
      if (profile.phone) defaultValueEditPersonalProfile.phone = profile.phone;
      if (profile.gender) {
        defaultValueEditPersonalProfile.gender =
          genderData.find((item) => item.value === profile.gender) ??
          genderData[0];
      }
      reset(defaultValueEditPersonalProfile);
    }
  }, [profile, reset]);

  const queryClient = useQueryClient();
  const { mutateAsync: mutateEditPersonalProfile } = useMutation({
    mutationFn:
      profile && profile.roles[0].code === 'TEACHER'
        ? accountApi.editMentorPersonalProfile
        : accountApi.editMemberPersonalProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/loginUser'] });
      queryClient.invalidateQueries({
        queryKey: [keyMentorProfileUseCheckCompleteness],
      });
    },
  });

  const toastMsgLoading = 'Đang cập nhật ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
  const toastMsgError = (error: any): string =>
    `Cập nhật không thành công: ${error.message}`;
  const handleSubmitSuccess = async (data: EditPersonalProfileFormDefault) => {
    const params: EditPersonalProfileFormSubmit = {
      fullName: data.fullName,
      birthday: data.birthday,
      address: data.address,
      phone: data.phone,
      gender: data.gender ? data.gender.value : genderData[0].value,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditPersonalProfile(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error));
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
      name: 'fullName',
      label: 'Họ tên',
      placeholder: 'Nhập họ tên',
      variant: 'text',
      size: 12,
    },
    {
      name: 'address',
      label: 'Địa chỉ',
      placeholder: 'Nhập địa chỉ',
      variant: 'text',
      size: 12,
    },
    {
      name: 'birthday',
      label: 'Ngày sinh',
      placeholder: 'Nhập ngày sinh',
      variant: 'date',
      size: 6,
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      placeholder: 'Nhập số điện thoại',
      variant: 'text',
      size: 6,
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Thông tin cá nhân
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      {profile && (
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
            <Grid item xs={12}>
              <Typography sx={SX_FORM_LABEL}>Giới tính</Typography>
              <FormInput
                dataDropdownDynamicValue={genderData}
                variant="dropdownDynamicValue"
                name="gender"
                control={control}
              />
            </Grid>
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
