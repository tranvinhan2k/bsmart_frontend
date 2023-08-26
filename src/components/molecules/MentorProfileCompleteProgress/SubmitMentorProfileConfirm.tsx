import { Box, Stack, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { useDispatchProfile } from '~/hooks';
import { useRequestApproval } from '~/hooks/mentorProfile/useRequestApproval';
import { toastMsgError } from '~/utils/common';
import toast from '~/utils/toast';

interface SubmitMentorProfileConfirmProps {
  idMentorProfile: number;
  handleRefetch: () => void;
  onClose: () => void;
}
export default function SubmitMentorProfileConfirm({
  idMentorProfile,
  handleRefetch,
  onClose,
}: SubmitMentorProfileConfirmProps) {
  const enum Text {
    warning0 = 'Hồ sơ giảng dạy không thể chỉnh sửa sau khi phê duyệt',
    warning1 = 'Nếu muốn chỉnh sửa phải gửi yêu cầu phê duyệt mới',
    warning2 = 'Hãy kiểm tra nội dung thật kĩ trước khi gửi cho quản trị viên',
    buttonCancel = 'Hủy bỏ',
    buttonSubmit = 'Xác nhận',
  }
  const { mutateAsync: requestApproval } = useRequestApproval();
  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();

  const toastMsgLoading = 'Đang gửi hồ sơ...';
  const toastMsgSuccess = 'Gửi hồ sơ thành công';
  const handleSubmitSuccess = async () => {
    const id = toast.loadToast(toastMsgLoading);
    try {
      await requestApproval(idMentorProfile);
      handleDispatchProfile();
      handleRefetch();
      onClose();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  return (
    <Box mt={1}>
      <Typography component="h3">- {Text.warning0}</Typography>
      <Typography component="h3">- {Text.warning1}</Typography>
      <Typography component="h3">- {Text.warning2}</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        mt={4}
      >
        <Button
          fullWidth
          color="error"
          variant="contained"
          onClick={onClose}
          sx={{ fontFamily: FontFamily.bold }}
        >
          {Text.buttonCancel}
        </Button>
        <Button
          fullWidth
          color="miSmartOrange"
          variant="contained"
          onClick={handleSubmitSuccess}
          sx={{ fontFamily: FontFamily.bold }}
        >
          {Text.buttonSubmit}
        </Button>
      </Stack>
    </Box>
  );
}
