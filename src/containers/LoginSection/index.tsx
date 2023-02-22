import { Stack } from '@mui/material';
import { Color, Common, MetricSize } from '~/assets/variables';
import LoginForm from '~/components/molecules/FormComponent/LoginFormSection';

export default function LoginSection() {
  return (
    <Stack
      sx={{
        boxShadow: { xs: 0, md: 5 },
        borderWidth: { xs: 1, md: 0 },
        borderRadius: Common.borderRadius,
        borderColor: Color.grey,
        width: { xs: '90vw', md: '30vw' },
        padding: MetricSize.large_20,
      }}
    >
      <LoginForm />
    </Stack>
  );
}
