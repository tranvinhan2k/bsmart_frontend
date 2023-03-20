import { Box, Divider, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { defaultValueEditCertificateProfile } from '~/form/defaultValues';
import { EDIT_CERTIFICATE_PROFILE_FIELDS } from '~/form/schema';
import {
  EditCertificateProfileFormDataPayload,
  FormInputVariant,
} from '~/models/form';
import { validationSchemaEditCertificateProfile } from '~/form/validation';
import accountApi, { EditCertificateProfilePayload } from '~/api/users';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';

import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';
import { useYupValidationResolver } from '~/hooks';

export default function EditCertificateProfileForm() {
  const resolverEditCertificateProfile = useYupValidationResolver(
    validationSchemaEditCertificateProfile
  );
  const editProfileHookForm = useForm({
    defaultValues: defaultValueEditCertificateProfile,
    resolver: resolverEditCertificateProfile,
  });

  // const queryClient = useQueryClient();
  const { mutateAsync: mutateEditCertificateProfile } = useMutation({
    mutationFn: accountApi.editCertificateProfile,
  });

  const handleSubmitSuccess = async (
    data: EditCertificateProfileFormDataPayload
  ) => {
    const params: EditCertificateProfilePayload = {
      certificate1: data.certificate1,
      certificate2: data.certificate2,
      certificate3: data.certificate3,
      certificate4: data.certificate4,
      certificate5: data.certificate5,
    };
    console.log(data);
    console.log(params);
    // const id = toast.loadToast('Đang cập nhật ...');
    // try {
    //   await mutateEditCertificateProfile(params);
    //   toast.updateSuccessToast(id, 'Cập nhật thành công');
    // } catch (error: any) {
    //   toast.updateFailedToast(id, `Đăng kí không thành công: ${error.message}`);
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
    TITLE: 'Thông tin bằng cấp (2 mặt bằng cấp/chứng chỉ)',
    CERTIFICATE1: { LABEL: 'Bằng cấp (1)' },
    CERTIFICATE2: { LABEL: 'Bằng cấp (2)' },
    CERTIFICATE3: { LABEL: 'Bằng cấp (3)' },
    CERTIFICATE4: { LABEL: 'Bằng cấp (4)' },
    CERTIFICATE5: { LABEL: 'Bằng cấp (5)' },
    BUTTON_TEXT: 'Cập nhật',
  };

  const formFieldsCertificate: FormFieldsCertificateProps[] = [
    {
      name: EDIT_CERTIFICATE_PROFILE_FIELDS.certificate1,
      label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.CERTIFICATE1.LABEL,
      placeholder: '',
      variant: 'file',
      size: 12,
    },
    {
      name: EDIT_CERTIFICATE_PROFILE_FIELDS.certificate2,
      label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.CERTIFICATE2.LABEL,
      placeholder: '',
      variant: 'file',
      size: 12,
    },
    {
      name: EDIT_CERTIFICATE_PROFILE_FIELDS.certificate3,
      label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.CERTIFICATE3.LABEL,
      placeholder: '',
      variant: 'file',
      size: 12,
    },
    {
      name: EDIT_CERTIFICATE_PROFILE_FIELDS.certificate4,
      label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.CERTIFICATE4.LABEL,
      placeholder: '',
      variant: 'file',
      size: 12,
    },
    {
      name: EDIT_CERTIFICATE_PROFILE_FIELDS.certificate5,
      label: EDIT_CERTIFICATE_PROFILE_FORM_TEXT.CERTIFICATE5.LABEL,
      placeholder: '',
      variant: 'file',
      size: 12,
    },
  ];

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.TITLE}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <form onSubmit={editProfileHookForm.handleSubmit(handleSubmitSuccess)}>
        <Grid container columnSpacing={3}>
          {formFieldsCertificate.map((field) => (
            <Grid item xs={field.size} key={field.name}>
              <Typography sx={SX_FORM_LABEL}>{field.label}</Typography>
              <FormInput
                control={editProfileHookForm.control}
                name={field.name}
                variant={field.variant}
                placeholder={field.placeholder}
              />
            </Grid>
          ))}
        </Grid>
        <Button customVariant="normal" type="submit">
          {EDIT_CERTIFICATE_PROFILE_FORM_TEXT.BUTTON_TEXT}
        </Button>
      </form>
    </Box>
  );
}
