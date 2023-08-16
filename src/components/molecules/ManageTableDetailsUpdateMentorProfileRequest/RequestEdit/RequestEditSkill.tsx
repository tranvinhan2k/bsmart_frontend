import { Grid, Stack, Typography } from '@mui/material';
import { useGetMentorProfileUpdateRequestDetails } from '~/hooks/user/UseGetMentorProfileUpdateRequestPayload';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_VALUE,
} from '../style';
import sx from './style';

interface RequestEditSkillProps {
  rowId: number;
}

export default function RequestEditSkill({ rowId }: RequestEditSkillProps) {
  const enum Text {
    mainTitle = 'Chuyên môn',
    labelSkill = 'Kĩ năng',
    labelYOE = 'Số năm kinh nghiệm',
    labelYear = 'năm',
  }

  const { updaterRequestDetails, isLoading } =
    useGetMentorProfileUpdateRequestDetails(rowId);

  // const skills: any[] = [];
  const skills = updaterRequestDetails
    ? updaterRequestDetails.userDtoEdit.mentorProfile.mentorSkills
    : [];

  return (
    <Stack sx={sx.wrapperEditSelected}>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
          <Grid container mt={2}>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_ITEM_LABEL}>{Text.labelSkill}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_ITEM_LABEL}>{Text.labelYOE}</Typography>
            </Grid>
          </Grid>
          {skills.map((item: any) => (
            <Grid container key={item.skillId}>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_VALUE}>{item.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_VALUE}>
                  {item.yearOfExperiences} {Text.labelYear}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}
