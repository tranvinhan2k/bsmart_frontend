import { Box, Chip, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMentorDetails } from '~/hooks/mentorProfile/useGetMentorDetails';
import globalStyles from '~/styles';
import sx from './style';

export default function MentorDetailsHeader() {
  const { id } = useParams();
  const { mentorDetails } = useGetMentorDetails(Number(id));

  const mentorName = mentorDetails?.user.fullName;
  const teachingInfo = mentorDetails
    ? [
        {
          id: 0,
          label: 'Khóa học',
          value: mentorDetails.user.teachInformation?.numberOfCourse ?? 0,
        },
        {
          id: 1,
          label: 'Lớp học',
          value: mentorDetails.user.teachInformation?.numberOfClass ?? 0,
        },
        // {
        //   id: 3,
        //   label: 'Đánh giá',
        //   value: `${
        //     mentorDetails.user.teachInformation?.numberOfFeedBack ?? 0
        //   }/5`,
        // },
        // {
        //   id: 4,
        //   label: 'Lượt đánh giá',
        //   value: mentorDetails.user.teachInformation?.scoreFeedback ?? 0,
        // },
      ]
    : [];

  // const skills = [];

  const skills = mentorDetails?.mentorSkills.map((skill) => {
    return {
      id: skill.skillId,
      label: skill.name,
      yoe: skill.yearOfExperiences,
    };
  });

  return (
    <Box sx={globalStyles.viewRoundedWhiteBody}>
      <Box>
        <Typography sx={sx.titleMentorRole}>Giáo viên</Typography>
        <Typography sx={sx.titleMentorName}>{mentorName}</Typography>
      </Box>
      <Grid container spacing={2} mb={4}>
        {skills &&
          skills.map((skill) => (
            <Grid item key={skill.id}>
              <Tooltip
                title={`Có ${skill.yoe} năm kinh nghiệm ${skill.label}`}
                arrow
                placement="bottom"
              >
                <Chip
                  size="small"
                  color="default"
                  label={`${skill.label} - ${skill.yoe} năm`}
                  // title={`Có ${skill.yoe} năm kinh nghiệm ${skill.label}`}
                />
              </Tooltip>
            </Grid>
          ))}
      </Grid>
      <Grid container>
        {teachingInfo &&
          teachingInfo.map((item) => (
            <Grid item xs={3} key={item.id}>
              <Stack>
                <Typography sx={sx.itemTitle}>{item.label}</Typography>
                <Typography sx={sx.itemValue}>{item.value}</Typography>
              </Stack>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
