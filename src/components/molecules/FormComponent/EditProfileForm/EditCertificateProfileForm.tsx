import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { EditCertificateProfilePayload } from '~/api/users';
import UpdateProfileButton from '~/components/atoms/Button/UpdateProfileButton';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { MentorProfileStatusType } from '~/constants/profile';
import { defaultValueEditCertificateProfile } from '~/form/defaultValues';
import { EDIT_CERTIFICATE_PROFILE_FIELDS } from '~/form/schema';
import { validationSchemaEditCertificateProfile } from '~/form/validation';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useMutationEditCertificateProfile } from '~/hooks/useMutationEditCertificateProfile';
import { useGetProfile } from '~/hooks/user/useGetProfile';
import {
  EditCertificateProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { toastMsgError } from '~/utils/common';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_LABEL, SX_FORM_TITLE } from './style';

export default function EditCertificateProfileForm() {
  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';

  // const { profile: dataGetProfile } = useGetProfile();
  // const token =
  //   useSelector((state: RootState) => state.user.token) ||
  //   localStorage.getItem('token');
  // const queryKey = ['/loginUser'];
  // const config = {
  //   headers: { Authorization: `Bearer ${token}` },
  // };

  // const { data: dataGetProfile } = useQuery(
  //   queryKey,
  //   () => accountApi.getProfile(config),
  //   {
  //     enabled: Boolean(token),
  //   }
  // );
  // const dataGetProfile = useSelector(selectProfile);
  const { profile: dataGetProfile, refetch } = useGetProfile();

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const { mutateAsync: mutateEditCertificateProfile } =
    useMutationEditCertificateProfile();

  const resolverEditCertificateProfile = useYupValidationResolver(
    validationSchemaEditCertificateProfile
  );
  const { control, reset, handleSubmit, getValues, formState } = useForm({
    defaultValues: defaultValueEditCertificateProfile,
    resolver: resolverEditCertificateProfile,
    mode: 'onChange',
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
    append(null);
  };
  const removeCertificate = (index: number, certificate: any) => {
    remove(index);
    if (certificate.type === 'DEGREE') {
      setDegreeIdsToDelete((prev) => {
        return [...prev, certificate.id];
      });
    }
  };

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
      handleDispatchProfile();
      refetch();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
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
    TITLE: 'Thông tin bằng cấp / CV',
    USERIMAGES: { LABEL: 'Bằng cấp' },
    BUTTON_TEXT: 'Cập nhật',
  };

  const enum CertificateNoteText {
    label0 = 'Kích thước tệp tối đa là 10 MB.',
    label1 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    label2 = 'Không đặt mật khẩu bảo vệ file của bạn.',
    label3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    label41 = 'Định dạng hỗ trợ',
    label42 = '.pdf, .doc, .docx',
  }
  const certificateNoteList = [
    { id: 0, label: CertificateNoteText.label0 },
    { id: 1, label: CertificateNoteText.label1 },
    { id: 2, label: CertificateNoteText.label2 },
    { id: 3, label: CertificateNoteText.label3 },
  ];

  const formFieldsCertificate: FormFieldsCertificateProps = {
    name: EDIT_CERTIFICATE_PROFILE_FIELDS.userImages,
    label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.USERIMAGES.LABEL,
    placeholder: '',
    variant: 'fileRequireYup',
    size: 12,
  };

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Box my={2}>
        {certificateNoteList.map((item) => (
          <Typography component="h3" key={item.id}>
            {item.id + 1}. {item.label}
          </Typography>
        ))}
        <Typography component="h3">
          {certificateNoteList.length + 1}. {CertificateNoteText.label41} :{' '}
          <b>{CertificateNoteText.label42}</b>
        </Typography>
      </Box>
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
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={2}
                >
                  <FormInput
                    control={control}
                    name={`${formFieldsCertificate.name}[${index}]`}
                    variant={formFieldsCertificate.variant}
                    placeholder={formFieldsCertificate.placeholder}
                  />
                  <MuiButton
                    color="error"
                    size="small"
                    variant="outlined"
                    disabled={
                      !(
                        dataGetProfile?.mentorProfile?.status ===
                          MentorProfileStatusType.REQUESTING ||
                        dataGetProfile?.mentorProfile?.status ===
                          MentorProfileStatusType.EDITREQUEST
                      )
                    }
                    onClick={() =>
                      removeCertificate(
                        index,
                        getValues(`${formFieldsCertificate.name}[${index}]`)
                      )
                    }
                  >
                    <Icon name="delete" size="medium" />
                  </MuiButton>
                </Stack>
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={12} my={2}>
            <FormInput
              control={control}
              name="userImages"
              variant="arrayHelperText"
              placeholder="a"
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <MuiButton
              color="success"
              size="large"
              variant="outlined"
              disabled={
                !(
                  dataGetProfile?.mentorProfile?.status ===
                    MentorProfileStatusType.REQUESTING ||
                  dataGetProfile?.mentorProfile?.status ===
                    MentorProfileStatusType.EDITREQUEST
                )
              }
              onClick={() => appendCertificate()}
            >
              <Icon name="add" size="medium" />
            </MuiButton>
          </Grid>
        </Grid>
        <Box mt={4}>
          {dataGetProfile && (
            <UpdateProfileButton
              role={dataGetProfile.roles[0].code}
              isFormDisabled={!formState.isDirty}
              mentorProfileStatus={dataGetProfile.mentorProfile?.status}
            />
          )}
        </Box>
      </form>
    </Box>
  );
}
