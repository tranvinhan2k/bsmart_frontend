import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
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
import {
  SX_FORM,
  SX_FORM_LABEL,
  SX_FORM_TITLE,
} from './UpdateMentorProfileRequestSubmit/style';

export default function UpdateMentorDegree() {
  const enum Text {
    title = '2. Bổ sung thông tin bằng cấp',
    description1 = 'Kích thước tệp tối đa là 10 MB.',
    description2 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    description3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    description4 = 'Kích thước tệp tối đa là 10 MB.',
    submitButton = 'Cập nhật',
    userImagesLabel = 'Bằng cấp',
  }

  const { refetch: refetchProfile } = useGetProfile();
  const { refetch: refetchRequestInfo } =
    useGetUpdateMentorProfileRequestInfo();

  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();

  const { mutateAsync: mutateUpdateDegreeRequest } =
    useMutationUpdateDegreeRequest();
  const resolverUpdateDegreeRequest = useYupValidationResolver(
    validationSchemaUpdateDegreeRequest
  );
  const {
    control,
    formState,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: defaultValuesUpdateDegreeRequest,
    resolver: resolverUpdateDegreeRequest,
  });
  // const [degreeIdsToDelete, setDegreeIdsToDelete] = useState<number[]>([]);

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
  const removeCertificate = (index: number) => {
    remove(index);
  };

  const toastMsgLoading = 'Đang cập nhật...';
  const toastMsgSuccess = 'Cập nhật thành công';
  const handleSubmitSuccess = async (
    data: EditCertificateProfileFormDataPayload
  ) => {
    const params: EditCertificateProfilePayload = {
      userImages: data.userImages,
    };
    data.userImages.forEach((e, index) => {
      remove(index);
    });
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateUpdateDegreeRequest(params);
      resetForm();
      refetchProfile();
      refetchRequestInfo();
      handleDispatchProfile();
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
  const formFieldsCertificate: FormFieldsCertificateProps = {
    name: EDIT_CERTIFICATE_PROFILE_FIELDS.userImages,
    label: Text.userImagesLabel,
    placeholder: '',
    variant: 'fileRequireYup',
    size: 12,
  };

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {Text.title}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography component="h3">- {Text.description1}</Typography>
      <Typography component="h3">- {Text.description2}</Typography>
      <Typography component="h3">- {Text.description3}</Typography>
      <Typography component="h3">- {Text.description4}</Typography>
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
          {/* <Grid item xs={12} my={2}>
            <FormInput
              control={control}
              name="userImages"
              variant="arrayHelperText"
              placeholder="a"
            />
          </Grid> */}
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
    </Box>
  );
}
