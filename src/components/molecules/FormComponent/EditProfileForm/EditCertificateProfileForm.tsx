import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
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
import { FontFamily } from '~/assets/variables';
import { useMutationEditCertificateProfile } from '~/hooks/useMutationEditCertificateProfile';
import { useYupValidationResolver } from '~/hooks';
import Icon from '~/components/atoms/Icon';
import FormInput from '~/components/atoms/FormInput';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';

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

  const { mutateAsync: mutateEditCertificateProfile } =
    useMutationEditCertificateProfile();

  const resolverEditCertificateProfile = useYupValidationResolver(
    validationSchemaEditCertificateProfile
  );
  const { control, reset, handleSubmit, getValues } = useForm({
    defaultValues: defaultValueEditCertificateProfile,
    resolver: resolverEditCertificateProfile,
  });
  const [degreeIdsToDelete, setDegreeIdsToDelete] = useState<number[]>([]);

  useEffect(() => {
    if (dataGetProfile) {
      const defaults = defaultValueEditCertificateProfile;
      if (dataGetProfile.userImages) {
        defaults.userImages = dataGetProfile.userImages.filter(
          (item: any) => item.type === 'DEGREE'
        );
      }
      reset(defaults);
    }
  }, [dataGetProfile, reset]);

  const handleSubmitSuccess = async (
    data: EditCertificateProfileFormDataPayload
  ) => {
    const params: EditCertificateProfilePayload =
      degreeIdsToDelete.length > 0
        ? {
            userImages: data.userImages,
            degreeIdsToDelete,
          }
        : {
            userImages: data.userImages,
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
    USERIMAGES: { LABEL: 'Bằng cấp' },
    DESC1: 'Kích thước tệp tối đa là 10 MB.',
    DESC2:
      'Bạn có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    DESC3: 'Không đặt mật khẩu bảo vệ file của bạn.',
    DESC4: 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    DESC5: 'Hãy chụp 2 mặt bằng cấp/chứng chỉ',
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsCertificate: FormFieldsCertificateProps = {
    name: EDIT_CERTIFICATE_PROFILE_FIELDS.userImages,
    label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.USERIMAGES.LABEL,
    placeholder: '',
    variant: 'file',
    size: 12,
  };

  const {
    fields: certificateFields,
    append,
    remove,
  } = useFieldArray({
    name: 'userImages',
    control,
    rules: {
      required: 'Hãy nhập ít nhất 1 bằng',
    },
  });

  const appendCertificate = () => {
    append('');
  };
  const removeCertificate = (index: number, certificate: any) => {
    remove(index);
    if (certificate.type === 'DEGREE') {
      setDegreeIdsToDelete((prev) => {
        return [...prev, certificate.id];
      });
    }
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
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <FormInput
                    control={control}
                    name={`${formFieldsCertificate.name}.${index}`}
                    variant={formFieldsCertificate.variant}
                    placeholder={formFieldsCertificate.placeholder}
                  />
                  <MuiButton
                    color="error"
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      removeCertificate(
                        index,
                        getValues(`${formFieldsCertificate.name}.${index}`)
                      )
                    }
                  >
                    <Icon name="delete" size="medium" />
                  </MuiButton>
                </Stack>
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={12} lg={3} mt={2}>
            <MuiButton
              color="success"
              size="large"
              variant="outlined"
              onClick={() => appendCertificate()}
            >
              <Icon name="add" size="medium" />
            </MuiButton>
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
    </Box>
  );
}
