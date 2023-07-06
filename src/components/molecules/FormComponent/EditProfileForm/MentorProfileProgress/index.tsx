import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { FontFamily } from '~/assets/variables';
import { selectProfile } from '~/redux/user/selector';
import { useCheckMentorProfilesCompleteness } from '~/hooks/useManageProfile/checkMentorProfilesCompleteness';
import { useRequestApproval } from '~/hooks/useManageProfile/requestApproval';
import CompleteProgressField from '~/components/molecules/MentorProfileCompleteProgress/CompleteProgressField';
import toast from '~/utils/toast';
import { SX_FORM, SX_FORM_TITLE } from '../style';

export default function MentorProfileProgress() {
  const profile = useSelector(selectProfile);
  const { mentorProfilesCompleteness } = useCheckMentorProfilesCompleteness();
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
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (error: any) {
      toast.updateFailedToast(id, toastMsgError(error.message));
    }
  };

  return (
    <Box sx={SX_FORM}>
      <Typography component="h3" sx={SX_FORM_TITLE}>
        Hoàn tất hồ sơ giảng dạy
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      {mentorProfilesCompleteness && (
        <>
          {mentorProfilesCompleteness.allowSendingApproval ? (
            <Typography component="h3">
              Hồ sơ đã sẳn sàng gửi cho quản trị viên phê duyệt
            </Typography>
          ) : (
            <Typography component="h3">
              Hãy hoàn tất các <strong>Thông tin bắt buộc</strong> để có thể nộp
              hồ sơ
            </Typography>
          )}
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

          <Box mt={4}>
            <MuiButton
              color="miSmartOrange"
              fullWidth
              size="large"
              variant="contained"
              disabled={!mentorProfilesCompleteness.allowSendingApproval}
              onClick={handleSubmitSuccess}
              sx={{ fontFamily: FontFamily.bold }}
            >
              Nộp hồ sơ
            </MuiButton>
          </Box>
        </>
      )}
    </Box>
  );
}
