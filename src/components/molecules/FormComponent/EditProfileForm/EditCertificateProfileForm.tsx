import { Box, Divider, Typography, Grid } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { defaultValueEditCertificateProfile } from '~/form/defaultValues';
import { RootState } from '~/redux/store';
import { EDIT_CERTIFICATE_PROFILE_FIELDS } from '~/form/schema';
import {
  EditCertificateProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { validationSchemaEditCertificateProfile } from '~/form/validation';
import accountApi, { EditCertificateProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';
import { useYupValidationResolver } from '~/hooks';

export default function EditCertificateProfileForm() {
  const toastMsgLoading = 'Đang cập nhật ...';
  const toastMsgSuccess = 'Cập nhật thành công ...';
  const toastMsgError = (error: any): string => {
    return `Cập nhật không thành công: ${error.message}`;
  };

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

  const resolverEditCertificateProfile = useYupValidationResolver(
    validationSchemaEditCertificateProfile
  );
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValueEditCertificateProfile,
    resolver: resolverEditCertificateProfile,
  });

  // const queryClient = useQueryClient();
  const { mutateAsync: mutateEditCertificateProfile } = useMutation({
    mutationFn: accountApi.editCertificateProfile,
  });

  // useEffect(() => {
  //   if (dataGetProfile) {
  //     const defaults = defaultValueEditCertificateProfile;
  //     if (dataGetProfile.mentorProfile.workingExperience)
  //       defaults.workingExperience =
  //         dataGetProfile.mentorProfile.workingExperience;
  //     if (dataGetProfile.mentorProfile.mentorSkills) {
  //       defaults.mentorSkills = dataGetProfile.mentorProfile.mentorSkills.map(
  //         (item: any) => ({
  //           skillId: item.skillId,
  //           yearOfExperiences: item.yearOfExperiences,
  //         })
  //       );
  //     }
  //     if (dataGetProfile.mentorProfile.introduce)
  //       defaults.introduce = dataGetProfile.mentorProfile.introduce;
  //     reset(defaults);
  //   }
  // }, [dataGetProfile, reset, subjects]);

  const handleSubmitSuccess = async (
    data: EditCertificateProfileFormDataPayload
  ) => {
    const params: EditCertificateProfilePayload = {
      certificates: data.certificates,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateEditCertificateProfile(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  interface FormFieldsCertificateProps {
    name: string;
    variant: FormInputVariant;
    label: string;
    placeholder?: string;
    size: number;
  }

  const EDIT_CERTIFICATE_PROFILE_FORM_TEXT = {
    TITLE: 'Thông tin bằng cấp',
    CERTIFICATES: { LABEL: 'Bằng cấp' },
    DESC1: 'Kích thước tệp tối đa là 10 MB.',
    DESC2:
      'Bạn có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    DESC3: 'Không mật khẩu bảo vệ PDF của bạn.',
    DESC4: 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    DESC5: 'Hãy chụp 2 mặt bằng cấp/chứng chỉ',
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsCertificate: FormFieldsCertificateProps = {
    name: EDIT_CERTIFICATE_PROFILE_FIELDS.certificates,
    label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.CERTIFICATES.LABEL,
    placeholder: '',
    variant: 'file',
    size: 12,
  };

  const {
    fields: certificateFields,
    append,
    remove,
  } = useFieldArray({
    name: 'certificates',
    control,
    rules: {
      required: 'Hãy nhập ít nhất 1 bằng',
    },
  });

  const appendCertificate = () => {
    append({
      file: '',
    });
  };
  const removeCertificate = (order: number) => {
    remove(order);
  };

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography component="h3">
        - {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.DESC1}
      </Typography>
      <Typography component="h3">
        - {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.DESC2}
      </Typography>
      <Typography component="h3">
        - {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.DESC3}
      </Typography>
      <Typography component="h3">
        - {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.DESC4}
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitSuccess)}>
        <Grid container columnSpacing={3}>
          {certificateFields.map((field, index) => (
            <Fragment key={field.id}>
              <Grid item xs={12}>
                <Typography sx={SX_FORM_LABEL}>
                  {`${formFieldsCertificate.label} ${1 + index}`}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormInput
                  control={control}
                  name={`${formFieldsCertificate.name}.${index}.file`}
                  variant={formFieldsCertificate.variant}
                  placeholder={formFieldsCertificate.placeholder}
                />
              </Grid>
              <Grid item xs={1} lg={1}>
                <Button
                  customVariant="normal"
                  size="small"
                  onClick={() => removeCertificate(index)}
                >
                  Xóa
                </Button>
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={6} lg={3}>
            <Button
              customVariant="normal"
              size="small"
              onClick={() => appendCertificate()}
            >
              Thêm bằng cấp
            </Button>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Button customVariant="normal" type="submit">
            {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.BUTTON_TEXT}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
