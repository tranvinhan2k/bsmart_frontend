import {
  Box,
  Button as MuiButton,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { useDispatchProfile } from '~/hooks';
import { useUpdateMentorProfileRequestSubmit } from '~/hooks/mentorProfile/useUpdateMentorProfileRequestSubmit';
import { useGetUpdateMentorProfileRequestInfo } from '~/hooks/user/useGetUpdateMentorProfileRequestInfo';
import { UpdateMentorProfileRequestSubmitPayload } from '~/models/mentorProfiles';
import { toastMsgError } from '~/utils/common';
import toast from '~/utils/toast';
import RequestedDegrees from './RequestedDegrees';
import RequestedSkills from './RequestedSkills';
import { SX_FORM, SX_FORM_TITLE } from './style';

export default function UpdateMentorProfileRequestSubmit() {
  const { handleDispatch: handleDispatchProfile } = useDispatchProfile();

  const { requestInfo, refetch: refetchRequestInfo } =
    useGetUpdateMentorProfileRequestInfo();
  // const requestInfo = null;

  const { mutateAsync: updateMentorProfileRequestSubmit } =
    useUpdateMentorProfileRequestSubmit();

  const toastMsgLoading = 'Đang gửi hồ sơ...';
  const toastMsgSuccess = 'Gửi hồ sơ thành công';
  const handleSubmitSuccess = async () => {
    const skillIds =
      requestInfo &&
      requestInfo[0].mentorSkillRequest &&
      requestInfo[0].mentorSkillRequest.length > 0
        ? requestInfo[0].mentorSkillRequest.map((item) => item.skillId)
        : [];
    const degreeIds =
      requestInfo &&
      requestInfo[0].degreeRequest &&
      requestInfo[0].degreeRequest.length > 0
        ? requestInfo[0].degreeRequest.map((item) => item.id)
        : [];

    const params: UpdateMentorProfileRequestSubmitPayload = {
      skillIds,
      degreeIds,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await updateMentorProfileRequestSubmit(params);
      refetchRequestInfo();
      handleDispatchProfile();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  const enum Text {
    title = '3. Xác nhận thông tin giảng viên cần bổ sung',
    description1 = 'Kích thước tệp tối đa là 10 MB.',
    description2 = 'Có thể tải lên tổng cộng 20 tệp. Vui lòng xem xét việc kết hợp nhiều trang thành một tệp nếu chúng có liên quan với nhau.',
    description3 = 'Chỉ tải lên các tài liệu chính xác, rõ ràng, dễ đọc.',
    description4 = 'Kích thước tệp tối đa là 10 MB.',
    labelAdditionSkill = 'Chuyên môn thêm',
    labelAdditionDegree = 'Bằng cấp bổ sung thêm',
    submitButton = 'Gửi yêu cầu',
    submitButtonTooltip = 'Gửi yêu cầu cho quản trị viên phê duyệt',
    submitDisabledButtonTooltip = 'Hiện chưa thêm thông tin mới',
    userImagesLabel = 'Bằng cấp',
    labelNoAddedRequest = 'Chưa thêm thông tin',
  }

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        {Text.title}
      </Typography>

      {requestInfo &&
      (requestInfo[0].totalDegreeRequest > 0 ||
        requestInfo[0].totalSkillRequest > 0) ? (
        <>
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
            <MuiButton
              color="miSmartOrange"
              fullWidth
              size="large"
              variant="contained"
              onClick={handleSubmitSuccess}
              sx={{ fontFamily: FontFamily.bold }}
            >
              Gửi yêu cầu
            </MuiButton>
          </Stack>
        </>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          mt={4}
        >
          <MuiButton
            color="miSmartOrange"
            fullWidth
            size="large"
            variant="contained"
            onClick={handleSubmitSuccess}
            disabled
            sx={{ fontFamily: FontFamily.bold }}
          >
            {Text.labelNoAddedRequest}
          </MuiButton>
        </Stack>
      )}
    </Box>
  );
}
