import { Grid } from '@mui/material';
import { useCheckMentorProfilesCompleteness } from '~/hooks/useManageProfile/checkMentorProfilesCompleteness';
import CompleteProgressField from './CompleteProgressField';

export default function MentorProfileCompleteProgress() {
  const { mentorProfilesCompleteness } = useCheckMentorProfilesCompleteness();

  return mentorProfilesCompleteness ? (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <CompleteProgressField
          data={
            mentorProfilesCompleteness.missingInformation[0].requiredInfo.fields
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
            mentorProfilesCompleteness.missingInformation[0].optionalInfo.fields
          }
          title="Thông tin tùy chỉnh"
          descComplete="Tất cả thông tin đã được điền"
          descMissing="Hãy hoàn thiện những thông tin sau để cải thiện hồ sơ của bạn trong mắt người học (Không cần điền đủ để nộp hồ sơ)"
        />
      </Grid>
    </Grid>
  ) : null;
}
