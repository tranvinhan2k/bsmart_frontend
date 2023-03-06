import { Stack } from '@mui/material';
import EditAccountInformationForm from '~/components/molecules/FormComponent/EditAccountInforamtionForm';

export default function EditAccountInformationSection() {
  return (
    <Stack sx={{ boxShadow: 3, padding: 1, margin: 1 }}>
      <EditAccountInformationForm />
    </Stack>
  );
}
