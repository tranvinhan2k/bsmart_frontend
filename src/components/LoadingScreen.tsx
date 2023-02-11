import { Stack } from '@mui/material';
import { Colors, MetricSize } from '~/assets/variables';
import loadingIcon from '~/assets/gifs/loading.gif';

function LoadingScreen() {
  return (
    <Stack
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        background: Colors.navy,
        height: MetricSize.fullHeight,
      }}
    >
      <img
        style={{ width: MetricSize.extraLarge, height: MetricSize.extraLarge }}
        src={loadingIcon}
        alt="loading"
      />
    </Stack>
  );
}
export default LoadingScreen;
