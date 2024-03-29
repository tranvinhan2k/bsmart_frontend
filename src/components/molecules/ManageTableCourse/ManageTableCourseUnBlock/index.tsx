import { Box, Button as MuiButton, Stack, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { toastMsgError } from '~/utils/common';
import { useMutationUnblockCourse } from '~/hooks/course/useMutationUnblockCourse';
import toast from '~/utils/toast';
import { SX_REQUEST_TITLE } from './style';

interface ManageTableCourseUnBlockProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableCourseUnBlock({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableCourseUnBlockProps) {
  const enum Text {
    mainTitle = 'Xác nhận bỏ chặn khóa học',
    desc00 = 'Khóa học',
    desc01 = 'của giảng viên',
    desc02 = 'sẽ được bỏ chăn',
    buttonCancel = 'Hủy',
    buttonSubmit = 'Bỏ chặn',
  }

  const { mutateAsync: mutateUnblock } = useMutationUnblockCourse(row.id);

  const courseCode = row.code ?? '';
  const courseName = row.name ?? '';
  const courseMentorName = row.mentor.name ?? '';

  const toastMsgLoading = 'Đang xử lý...';
  const toastMsgSuccess = 'Xử lý thành công...';
  const handleUnblockCourse = async () => {
    const id = toast.loadToast(toastMsgLoading);
    try {
      await mutateUnblock(row.id);
      onClose();
      refetchSearch();
      refetchGetNoOfRequest();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };
  const handleOnClose = () => onClose();

  return (
    <Box>
      <Box mb={3}>
        <Typography sx={SX_REQUEST_TITLE}>
          {Text.mainTitle} &quot;{courseCode}&quot;
        </Typography>
      </Box>
      <Box mb={3}>
        <Typography>
          {Text.desc00} <b>{courseName}</b> {Text.desc01}{' '}
          <b>{courseMentorName}</b> {Text.desc02}.
        </Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={2}
        mt={2}
      >
        <MuiButton
          fullWidth
          color="inherit"
          size="small"
          variant="outlined"
          sx={{ fontFamily: FontFamily.bold }}
          onClick={handleOnClose}
        >
          {Text.buttonCancel}
        </MuiButton>
        <MuiButton
          fullWidth
          color="error"
          size="small"
          type="submit"
          variant="contained"
          onClick={handleUnblockCourse}
          sx={{ fontFamily: FontFamily.bold }}
        >
          {Text.buttonSubmit}
        </MuiButton>
      </Stack>
    </Box>
  );
}
