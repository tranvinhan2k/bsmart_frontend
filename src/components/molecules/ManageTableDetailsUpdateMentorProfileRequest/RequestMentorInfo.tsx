import { Grid, Stack, Typography } from '@mui/material';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_VALUE,
} from './style';

interface BasicInfoProps {
  row: any;
}

export default function MentorDegree({ row }: BasicInfoProps) {
  const skills = row.mentorSkillRequest;

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Chuyên môn</Typography>
          <Grid container mt={2}>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_ITEM_LABEL}>Kĩ năng</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={SX_FORM_ITEM_LABEL}>
                Số năm kinh nghiệm
              </Typography>
            </Grid>
          </Grid>
          {skills.map((item: any) => (
            <Grid container key={item.skillId}>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_VALUE}>{item.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_VALUE}>
                  {item.yearOfExperiences} năm
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}
