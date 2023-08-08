import { Box, Button, Divider, Grid, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import Icon from '~/components/atoms/Icon';
import { useGetManagedMentorDetails } from '~/hooks/user/useGetManagedMentorDetails';
import globalStyles from '~/styles';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
  SX_FORM_VALUE,
} from './style';

interface BasicInfoProps {
  idMentor: number;
}

export default function MentorDegree({ idMentor }: BasicInfoProps) {
  const enum Text {
    mainTitle = 'Giới thiệu',
  }
  const { managedMentorDetails } = useGetManagedMentorDetails(idMentor);
  const introduce = managedMentorDetails
    ? managedMentorDetails?.mentorProfile?.introduce
    : '';
  const workingExperience = managedMentorDetails
    ? managedMentorDetails?.mentorProfile?.workingExperience
    : '';
  const skills = managedMentorDetails
    ? managedMentorDetails?.mentorProfile?.mentorSkills
    : undefined;

  const [isIntroduceExpanded, setIsIntroduceExpanded] =
    useState<boolean>(false);
  const [isWorkingExperienceExpanded, setIsWorkingExperienceExpanded] =
    useState<boolean>(false);
  const handleExpandIntroduce = () => {
    setIsIntroduceExpanded(!isIntroduceExpanded);
  };
  const handleExpandWorkingExperience = () => {
    setIsWorkingExperienceExpanded(!isWorkingExperienceExpanded);
  };

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
          <Box my={2}>
            {introduce.length > 0 ? (
              <Typography
                sx={
                  isIntroduceExpanded
                    ? globalStyles.displayEditorTextShowMore
                    : globalStyles.displayEditorTextShowLess
                }
                dangerouslySetInnerHTML={{
                  __html: `${
                    isIntroduceExpanded
                      ? introduce
                      : `${introduce.slice(0, 200)}...`
                  }`,
                }}
              />
            ) : (
              <Typography
                sx={globalStyles.displayEditorTextShowLess}
                dangerouslySetInnerHTML={{
                  __html: `${introduce}`,
                }}
              />
            )}
            <Button
              color="miSmartOrange"
              size="small"
              disableRipple
              endIcon={
                isIntroduceExpanded ? (
                  <Icon name="expandLessIcon" size="small" color="tertiary" />
                ) : (
                  <Icon name="expandMoreIcon" size="small" color="tertiary" />
                )
              }
              sx={globalStyles.displayEditorExpandButton}
              onClick={handleExpandIntroduce}
            >
              {isIntroduceExpanded ? 'Thu gọn' : 'Mở rộng'}
            </Button>
          </Box>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Kinh nghiệm</Typography>
          <Box my={2}>
            {workingExperience.length > 0 ? (
              <Typography
                sx={
                  isWorkingExperienceExpanded
                    ? globalStyles.displayEditorTextShowMore
                    : globalStyles.displayEditorTextShowLess
                }
                dangerouslySetInnerHTML={{
                  __html: `${
                    isWorkingExperienceExpanded
                      ? workingExperience
                      : `${workingExperience.slice(0, 200)}...`
                  }`,
                }}
              />
            ) : (
              <Typography
                sx={globalStyles.displayEditorTextShowLess}
                dangerouslySetInnerHTML={{
                  __html: `${workingExperience}`,
                }}
              />
            )}
            <Button
              color="miSmartOrange"
              size="small"
              disableRipple
              endIcon={
                isWorkingExperienceExpanded ? (
                  <Icon name="expandLessIcon" size="small" color="tertiary" />
                ) : (
                  <Icon name="expandMoreIcon" size="small" color="tertiary" />
                )
              }
              sx={globalStyles.displayEditorExpandButton}
              onClick={handleExpandWorkingExperience}
            >
              {isWorkingExperienceExpanded ? 'Thu gọn' : 'Mở rộng'}
            </Button>
          </Box>
          <Divider />
        </Grid>

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
          {skills &&
            skills.map((item: any) => (
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
