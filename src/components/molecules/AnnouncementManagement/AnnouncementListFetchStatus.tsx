import { CircularProgress, Stack, Typography } from '@mui/material';
import { Color } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { SX_FORM_LABEL, SX_FORM_LABEL_ERROR } from './style';

interface AnnouncementListFetchStatusProps {
  isError: boolean;
  isLoading: boolean;
}

export default function AnnouncementListFetchStatus({
  isLoading,
  isError,
}: AnnouncementListFetchStatusProps) {
  return isLoading || isError ? (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      my={5}
      py={5}
      sx={{
        border: '1px solid #dee2e6',
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: Color.white,
      }}
    >
      {isLoading && (
        <>
          <CircularProgress />
          <Typography sx={SX_FORM_LABEL}>Đang tải dữ liệu</Typography>
        </>
      )}
      {isError && (
        <>
          <Icon
            name="sentimentVeryDissatisfiedIcon"
            size="medium"
            color="red"
          />
          <Typography sx={SX_FORM_LABEL_ERROR}>
            Đã xảy ra lỗi, vui lòng thử lại
          </Typography>
          <Typography sx={SX_FORM_LABEL_ERROR}>
            Nếu tình trạng còn tiếp diễn xin hãy liên hệ với quản trị viên
          </Typography>
        </>
      )}
    </Stack>
  ) : null;
}
