import { Stack } from '@mui/material';
import EditSocialInformationForm from '~/components/molecules/FormComponent/EditSocialInformationForm';

export default function EditSocialInformationSection() {
  return (
    <Stack sx={{ boxShadow: 3, padding: 1, margin: 1 }}>
      <EditSocialInformationForm />
    </Stack>
  );
}
