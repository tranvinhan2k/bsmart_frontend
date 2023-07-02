import { Box, Divider, Grid, Typography, Stack } from '@mui/material';
import { Fragment } from 'react';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_VALUE,
  SX_FORM_ITEM_VALUE,
} from './style';

interface BasicInfoProps {
  row: any;
}

export default function MentorDegree({ row }: BasicInfoProps) {
  const title = [
    { id: 0, label: 'Giới thiệu', value: row.mentorProfile.introduce },
    { id: 1, label: 'Kinh nghiệm', value: row.mentorProfile.workingExperience },
  ];

  const skills = row.mentorProfile.mentorSkills;

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container spacing={2} mb={4}>
        {title.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Typography sx={SX_FORM_LABEL}>{item.label}</Typography>
            <Box mt={2}>
              <pre
                style={{
                  fontFamily: 'inherit',
                  whiteSpace: 'break-spaces',
                }}
              >
                <Typography sx={SX_FORM_VALUE}>{item.value}</Typography>
              </pre>
            </Box>
            <Divider />
          </Grid>
        ))}

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
            <Grid container key={item.id}>
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
