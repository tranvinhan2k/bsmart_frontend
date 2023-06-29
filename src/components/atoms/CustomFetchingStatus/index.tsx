import { CircularProgress, Stack, Typography } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import { SX_FORM_LABEL, SX_FORM_LABEL_ERROR, SX_WRAPPER } from './style';

interface CustomFetchingStatusProps {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  hasBackground: boolean;
}

export default function CustomFetchingStatus({
  isLoading,
  isError,
  error,
  hasBackground,
}: CustomFetchingStatusProps) {
  const errorDefaultMsg = `Đã xảy ra lỗi, xin hãy thử lại. Nếu tình trạng còn tiếp diễn xin hãy liên hệ với quản trị viên`;

  return isLoading || isError ? (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={hasBackground ? SX_WRAPPER : undefined}
      my={5}
      p={5}
    >
      {isLoading && (
        <>
          <CircularProgress />
          <Typography sx={SX_FORM_LABEL}>Đang tải dữ liệu</Typography>
        </>
      )}
      {isError && (
        <>
          <Icon name="warningIcon" size="medium" color="red" />
          <Typography sx={SX_FORM_LABEL_ERROR}>
            {error instanceof Error ? error.message : errorDefaultMsg}
          </Typography>
        </>
      )}
    </Stack>
  ) : null;
}
