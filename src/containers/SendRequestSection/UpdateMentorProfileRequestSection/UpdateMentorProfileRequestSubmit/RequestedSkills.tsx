import { Grid, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { useGetUpdateMentorProfileRequestInfo } from '~/hooks/user/useGetUpdateMentorProfileRequestInfo';
import { SX_FORM_ITEM_LABEL, SX_FORM_VALUE } from './style';

export default function RequestedSkills() {
  const { requestInfo } = useGetUpdateMentorProfileRequestInfo();

  const enum Text {
    titleFirstHalf = 'Chuyên môn (đã thêm',
    titleSecondHalf = ')',
    itemLabelSkill = 'Kĩ năng',
    itemLabelYearOfExperience = 'Số năm kinh nghiệm',
  }
  return requestInfo &&
    requestInfo[0]?.mentorSkillRequest &&
    requestInfo[0]?.mentorSkillRequest.length > 0 ? (
    <>
      {/* <Typography
        variant="h3"
        sx={{ fontFamily: FontFamily.bold, fontSize: 20 }}
      >
        {Text.titleFirstHalf}{' '}
        <b style={{ color: 'red' }}>
          {requestInfo[0]?.mentorSkillRequest.length ?? 0}
        </b>
        {Text.titleSecondHalf}
      </Typography> */}
      <Grid container mt={2}>
        <Grid item xs={6}>
          <Typography sx={SX_FORM_ITEM_LABEL}>{Text.itemLabelSkill}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={SX_FORM_ITEM_LABEL}>
            {Text.itemLabelYearOfExperience}
          </Typography>
        </Grid>
      </Grid>
      {requestInfo[0]?.mentorSkillRequest &&
        requestInfo[0]?.mentorSkillRequest.map((skill) => (
          <Grid container key={skill.skillId}>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_VALUE}>{skill.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_VALUE}>
                {skill.yearOfExperiences} năm
              </Typography>
            </Grid>
          </Grid>
        ))}
    </>
  ) : null;
}
