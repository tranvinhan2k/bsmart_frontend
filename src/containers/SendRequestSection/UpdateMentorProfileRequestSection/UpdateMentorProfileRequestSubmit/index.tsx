import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { FontFamily } from '~/assets/variables';
import { selectProfile } from '~/redux/user/selector';
import { useCheckCompleteness } from '~/hooks/mentorProfile/useCheckCompleteness';
import { useDispatchProfile } from '~/hooks';
import { useRequestApproval } from '~/hooks/mentorProfile/useRequestApproval';
import CompleteProgressField from '~/components/molecules/MentorProfileCompleteProgress/CompleteProgressField';
import toast from '~/utils/toast';
import {
  MentorProfileStatusLabel,
  MentorProfileStatusType,
} from '~/constants/profile';
import {
  SX_FORM_TITLE,
  SX_FORM,
  SX_STATUS,
  SX_FORM_ITEM_LABEL,
  SX_FORM_VALUE,
} from './style';
import { useGetUpdateMentorProfileRequestInfo } from '~/hooks/user/useGetUpdateMentorProfileRequestInfo';
import RequestedSkills from './RequestedSkills';
import RequestedDegrees from './RequestedDegrees';

export default function UpdateMentorProfileRequestSubmit() {
  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();
  const profile = useSelector(selectProfile);
  const { mentorProfilesCompleteness } = useCheckCompleteness();
  const { mutateAsync: requestApproval } = useRequestApproval();

  const toastMsgLoading = 'Đang gửi hồ sơ...';
  const toastMsgSuccess = 'Gửi hồ sơ thành công';
  const toastMsgError = (error: any): string =>
    `Gửi hồ sơ không thành công: ${error.message}`;
  const handleSubmitSuccess = async () => {
    const params = profile.mentorProfile.id ?? 0;
    const id = toast.loadToast(toastMsgLoading);
    try {
      await requestApproval(params);
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  const { requestInfo } = useGetUpdateMentorProfileRequestInfo();
  console.log('requestInfo', requestInfo);

  const enum Text {
    title = '3. Xác nhận thông tin giảng viên cần bổ sung',
    description1 = 'Kích thước tệp tối đa là 10 MB.',
    description2 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    description3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    description4 = 'Kích thước tệp tối đa là 10 MB.',
    labelAdditionSkill = 'Chuyên môn thêm',
    labelAdditionDegree = 'Bằng cấp bổ sung thêm',
    submitButton = 'Gửi yêu cầu',
    userImagesLabel = 'Bằng cấp',
  }

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {Text.title}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <RequestedSkills />
      <Box mt={4}>
        <RequestedDegrees />
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        mt={4}
      >
        <Tooltip title="Add" arrow>
          <MuiButton
            color="miSmartOrange"
            fullWidth
            size="large"
            variant="contained"
            onClick={handleSubmitSuccess}
            disabled={
              requestInfo &&
              (requestInfo[0].totalDegreeRequest <= 0 ||
                requestInfo[0].totalSkillRequest <= 0)
            }
            sx={{ fontFamily: FontFamily.bold }}
          >
            Gửi yêu cầu
          </MuiButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
