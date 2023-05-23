import { Box, Stack } from '@mui/material';
import {
  SX_LOADING_IMG,
  SX_LOADING_STACK,
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
    </Stack>
  );
}
export default LazyLoadingScreen;
