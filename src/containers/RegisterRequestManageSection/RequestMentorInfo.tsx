import { Box, Divider, Grid, Typography, Stack } from '@mui/material';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL, SX_FORM_VALUE } from './style';

interface BasicInfoProps {
  row: any;
}

export default function MentorDegree({ row }: BasicInfoProps) {
  const tmpTitle2 = [
    { id: 0, label: 'Giới thiệu', value: row.mentorProfile.introduce },
    { id: 1, label: 'Kinh nghiệm', value: row.mentorProfile.workingExperience },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container spacing={2} mb={4}>
        {tmpTitle2.map((item) => (
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
        </Grid>
      </Grid>
    </Stack>
  );
}
