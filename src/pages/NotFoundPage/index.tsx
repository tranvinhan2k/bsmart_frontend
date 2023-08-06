import { Box, Stack, Typography } from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';
import { image } from '~/constants/image';
import { SX_NOT_FOUND_STACK } from './styles';

export default function NotFoundPage() {
  return (
    <Stack sx={SX_NOT_FOUND_STACK}>
      <Box
        component="img"
        src={image.notFound}
        alt="Not found"
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
