import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Stack,
  Typography,
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
import { SX_FORM_TITLE, SX_FORM, SX_STATUS } from '../style';

export default function MentorProfileProgress() {
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

  let statusStyle = SX_STATUS.REQUESTING;
  let statusLabel = 'Đã xảy ra lỗi';
  switch (profile.mentorProfile.status) {
    case MentorProfileStatusType.REQUESTING:
      statusStyle = SX_STATUS.REQUESTING;
      statusLabel = MentorProfileStatusLabel.REQUESTING;
      break;
    case MentorProfileStatusType.WAITING:
      statusStyle = SX_STATUS.WAITING;
      statusLabel = MentorProfileStatusLabel.WAITING;
      break;
    case MentorProfileStatusType.EDITREQUEST:
      statusStyle = SX_STATUS.EDITREQUEST;
      statusLabel = MentorProfileStatusLabel.EDITREQUEST;
      break;
    case MentorProfileStatusType.REJECTED:
      statusStyle = SX_STATUS.REJECTED;
      statusLabel = MentorProfileStatusLabel.REJECTED;
      break;
    case MentorProfileStatusType.STARTING:
      statusStyle = SX_STATUS.STARTING;
      statusLabel = MentorProfileStatusLabel.STARTING;
      break;
    default:
      break;
  }

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Hoàn tất hồ sơ giảng dạy
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography component="h3">
        Để có thể nộp hồ sơ, hãy hoàn tất các thông tin bắt buộc
      </Typography>
      <Typography component="h3">
        Giáo viên không thể thay đổi thông tin sau khi được phê duyệt
      </Typography>
      <Typography display="inline">Trạng thái của hồ sơ: </Typography>
      <Typography sx={statusStyle}>{statusLabel}</Typography>
      {mentorProfilesCompleteness && (
        <>
          <Box mt={2} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CompleteProgressField
                data={
                  mentorProfilesCompleteness.missingInformation[0].requiredInfo
                    .fields
                }
                title="Thông tin bắt buộc"
                descComplete="Tất cả thông tin đã được điền"
                descMissing="Hãy hoàn thiện những thông tin sau để có thể nộp hồ sơ"
                percentComplete={mentorProfilesCompleteness.percentComplete}
              />
            </Grid>
            <Grid item xs={6}>
              <CompleteProgressField
                data={
                  mentorProfilesCompleteness.missingInformation[0].optionalInfo
                    .fields
                }
                title="Thông tin tùy chỉnh"
                descComplete="Tất cả thông tin đã được điền"
                descMissing="Hãy hoàn thiện những thông tin sau để cải thiện hồ sơ của bạn trong mắt người học (Không cần điền đủ để nộp hồ sơ)"
              />
            </Grid>
          </Grid>

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
              disabled={
                !(
                  mentorProfilesCompleteness.allowSendingApproval &&
                  (profile.mentorProfile.status ===
                    MentorProfileStatusType.REQUESTING ||
                    profile.mentorProfile.status ===
                      MentorProfileStatusType.EDITREQUEST)
                )
              }
              onClick={handleSubmitSuccess}
              sx={{ fontFamily: FontFamily.bold }}
            >
              Nộp hồ sơ
            </MuiButton>
          </Stack>
        </>
      )}
    </Box>
  );
}
