import { Stack, Typography, Divider } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import globalStyles from '~/styles';

interface Props {
  title: string;
}

export default function TextTitle({ title }: Props) {
  return (
    <Stack sx={{ marginBottom: 1 }}>
      <Typography
        sx={{
          ...globalStyles.textSubTitle,
          fontFamily: FontFamily.title,
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
}
