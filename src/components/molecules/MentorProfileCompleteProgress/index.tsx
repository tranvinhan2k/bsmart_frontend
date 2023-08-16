import { Box, Grid, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomDialog from '~/components/atoms/CustomDialog';
import {
  MentorProfileStatusLabel,
  MentorProfileStatusType,
} from '~/constants/profile';
import { useCheckCompleteness } from '~/hooks/mentorProfile/useCheckCompleteness';
import { useGetProfile } from '~/hooks/user/useGetProfile';
import CompleteProgressField from './CompleteProgressField';
import SubmitMentorProfileConfirm from './SubmitMentorProfileConfirm';

export default function MentorProfileCompleteProgress() {
  const { profile, refetch: refetchProfile } = useGetProfile();
  const { mentorProfilesCompleteness } = useCheckCompleteness();

  let tooltipLabel = 'Đã xảy ra lỗi';
  switch (profile && profile.mentorProfile.status) {
    case MentorProfileStatusType.REQUESTING:
      tooltipLabel = MentorProfileStatusLabel.REQUESTING;
      if (
        mentorProfilesCompleteness &&
        mentorProfilesCompleteness.percentComplete < 100
      ) {
        tooltipLabel = 'Hãy điền tất cả thông tin bắt buộc trước';
      }
      break;
    case MentorProfileStatusType.WAITING:
      tooltipLabel = MentorProfileStatusLabel.WAITING;
      break;
    case MentorProfileStatusType.EDITREQUEST:
      tooltipLabel = MentorProfileStatusLabel.EDITREQUEST;
      break;
    case MentorProfileStatusType.REJECTED:
      tooltipLabel = MentorProfileStatusLabel.REJECTED;
      break;
    case MentorProfileStatusType.STARTING:
      tooltipLabel = MentorProfileStatusLabel.STARTING;
      break;
    default:
      break;
  }

  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  return profile && mentorProfilesCompleteness ? (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
      <Box mt={2} mb={1}>
        <Tooltip title={tooltipLabel} arrow>
          <Stack direction="row" justifyContent="center" alignItems="stretch">
            <Button
              color="miSmartOrange"
              size="small"
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
              onClick={handleTriggerDialog}
              sx={{ fontFamily: FontFamily.bold }}
            >
              Nộp hồ sơ
            </Button>
          </Stack>
        </Tooltip>
      </Box>
      <CustomDialog
        title="Xác nhận nộp hồ sơ cho quản trị viên"
        open={open}
        onClose={handleTriggerDialog}
        maxWidth="sm"
      >
        <SubmitMentorProfileConfirm
          idMentorProfile={profile.mentorProfile.id}
          handleRefetch={refetchProfile}
          onClose={handleTriggerDialog}
        />
      </CustomDialog>
    </>
  ) : null;
}
