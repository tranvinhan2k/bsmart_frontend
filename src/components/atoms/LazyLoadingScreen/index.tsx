import { Box, Stack, Typography } from '@mui/material';
import {
  SX_LOADING_IMG,
  SX_LOADING_STACK,
  SX_LOADING_TITLE,
  SX_LOADING_DESC,
} from '~/components/atoms/LazyLoadingScreen/styles';
import { image } from '~/constants/image';

function LazyLoadingScreen() {
  return (
    <Stack sx={SX_LOADING_STACK}>
      <Box
        component="img"
        sx={SX_LOADING_IMG}
        src={image.loadingIcon}
        alt="loading"
      />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        paddingY={5}
        paddingX={20}
        marginBottom={3}
      >
        <Typography sx={SX_LOADING_TITLE}>Mismart</Typography>
        <Typography sx={SX_LOADING_DESC}>
          Nền tảng cho tương lai công nghệ
        </Typography>
      </Stack>
    </Stack>
  );
}
export default LazyLoadingScreen;
