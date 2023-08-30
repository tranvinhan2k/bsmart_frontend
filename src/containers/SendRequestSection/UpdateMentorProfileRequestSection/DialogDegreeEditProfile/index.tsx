import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { defaultValuesUpdateDegreeRequest } from '~/form/defaultValues';
import { EDIT_CERTIFICATE_PROFILE_FIELDS } from '~/form/schema';
import { EditCertificateProfilePayload } from '~/api/users';
import { FontFamily } from '~/assets/variables';
import { useDispatchProfile, useYupValidationResolver } from '~/hooks';
import { useGetProfile } from '~/hooks/user/useGetProfile';
import { useMutationUpdateDegreeRequest } from '~/hooks/user/useMutationUpdateDegreeRequest';
import { validationSchemaUpdateDegreeRequest } from '~/form/validation';
import {
  EditCertificateProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import toast from '~/utils/toast';
import { toastMsgError } from '~/utils/common';
import { useGetUpdateMentorProfileRequestInfo } from '~/hooks/user/useGetUpdateMentorProfileRequestInfo';
import { SX_FORM, SX_FORM_LABEL, SX_FORM_TITLE } from './style';
import { useGetMentorEditProfile } from '~/hooks/user/useGetEditProfile';
import { ProfileImgType } from '~/constants/profile';
import { useMutationEditCertificateProfile } from '~/hooks/useMutationEditCertificateProfile';

interface DialogDegreeEditProfileProps {
  open: boolean;
  handleOnClose: () => void;
}

export default function DialogDegreeEditProfile({
  open,
  handleOnClose,
}: DialogDegreeEditProfileProps) {
  const enum Text {
    title = '2. Bổ sung thông tin bằng cấp / CV',
    description1 = 'Kích thước tệp tối đa là 10 MB.',
    description2 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    description3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    description4 = 'Kích thước tệp tối đa là 10 MB.',
    submitButton = 'Cập nhật',
    userImagesLabel = 'Bằng cấp / CV',
  }

  const { profile, refetch } = useGetMentorEditProfile();
  const { mutateAsync: mutateEditCertificateProfile } =
    useMutationEditCertificateProfile();
  const resolverUpdateDegreeRequest = useYupValidationResolver(
    validationSchemaUpdateDegreeRequest
  );
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: defaultValuesUpdateDegreeRequest,
    resolver: resolverUpdateDegreeRequest,
    mode: 'onChange',
  });

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

  useEffect(() => {
    if (profile) {
      defaultValuesUpdateDegreeRequest.userImages =
        profile.userDto.userImages.filter(
          (item: any) => item.type === ProfileImgType.DEGREE
        );
    }
    reset(defaultValuesUpdateDegreeRequest);
  }, [profile, reset]);

  const appendCertificate = () => {
    append(null);
  };
  const removeCertificate = (index: number) => {
    remove(index);
  };

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const handleSubmitSuccess = async (
    data: EditCertificateProfileFormDataPayload
  ) => {
    const newDegree = data.userImages.filter((item) => item instanceof File);
    const params: EditCertificateProfilePayload = {
      userImages: newDegree,
      status: false,
    };
    console.log('params', params);
    // const id = toast.loadToast(toastMsgLoading);
    // try {
    //   await mutateEditCertificateProfile(params);
    //   reset();
    //   refetch();
    //   handleOnClose();
    //   // refetchProfile();
    //   // refetchRequestInfo();
    //   // handleDispatchProfile();
    //   toast.updateSuccessToast(id, toastMsgSuccess);
    // } catch (error: unknown) {
    //   toast.updateFailedToast(id, toastMsgError(error));
    // }
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
    USERIMAGES: { LABEL: 'Tài liệu bằng cấp / CV' },
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
    <Dialog open={open} onClose={handleOnClose} fullWidth>
      <DialogTitle>Thêm thông tin bằng cấp (Chỉ thêm)</DialogTitle>
      <DialogContent>
        {/* <Typography component="h3" sx={SX_FORM_TITLE}>
          {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.TITLE}
        </Typography> */}
        <Divider />
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
                    justifyContent="flex-start"
                    alignItems="center"
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
                      onClick={() => removeCertificate(index)}
                    >
                      <Icon name="delete" size="medium" />
                    </MuiButton>
                  </Stack>
                </Grid>
              </Fragment>
            ))}
            <Grid item xs={12} lg={3} my={2}>
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
              disabled={!formState.isDirty}
            >
              {Text.submitButton}
            </MuiButton>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
