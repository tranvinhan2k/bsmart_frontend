import { Box, Stack } from '@mui/material';
import loadingIcon from '~/assets/gifs/loading.gif';
import {
  SX_LOADING_IMG,
  SX_LOADING_STACK,
} from '~/components/atoms/LazyLoadingScreen/styles';

function LazyLoadingScreen() {
  return (
    <Stack sx={SX_LOADING_STACK}>
      <Box
        component="img"
        sx={SX_LOADING_IMG}
        src={loadingIcon}
        alt="loading"
      />
    </Stack>
  );
}
export default LazyLoadingScreen;
