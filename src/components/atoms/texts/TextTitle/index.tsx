import { Stack, Typography, Divider } from '@mui/material';
import globalStyles from '~/styles';

interface Props {
  title: string;
}

export default function TextTitle({ title }: Props) {
  return (
    <Stack sx={{ marginBottom: 2 }}>
      <Typography sx={globalStyles.textTitle}>{title}</Typography>
      <Divider />
    </Stack>
  );
}
