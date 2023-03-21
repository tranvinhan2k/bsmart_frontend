import { Stack } from '@mui/material';
import EditCertificateInformationForm from '~/components/molecules/FormComponent/EditCertificateInformationForm';

export default function EditCertificateInformationSection() {
  return (
    <Stack sx={{ boxShadow: 3, padding: 1, margin: 1 }}>
      <EditCertificateInformationForm />
    </Stack>
  );
}
