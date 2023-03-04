import { Stack } from '@mui/material';
import EditBasicInformationForm from '~/components/molecules/FormComponent/EditBasicInformationForm';

export default function EditBasicInformationSection() {
  return (
    <Stack sx={{ boxShadow: 3, padding: 1, margin: 1 }}>
      <EditBasicInformationForm />
    </Stack>
  );
}
