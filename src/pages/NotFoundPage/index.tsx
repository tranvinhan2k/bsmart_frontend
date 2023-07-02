import { Stack, Box, Typography } from '@mui/material';
import { SX_NOT_FOUND_STACK, SX_NOT_FOUND_TEXT } from './styles';
import { image } from '~/constants/image';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';

export default function NotFoundPage() {
  return (
    <Stack sx={SX_NOT_FOUND_STACK}>
      <Box
        component="img"
        src={image.notFound}
        alt="Khong tim thay"
        sx={{
          width: '20%',
          height: undefined,
          objectFit: 'contain',
          aspectRatio: 1,
        }}
      />
      <Typography
        sx={{
          marginTop: 2,
          fontSize: FontSize.medium_28,
          fontFamily: FontFamily.light,
        }}
      >
        Không tìm thấy trang.
      </Typography>
    </Stack>
  );
}
