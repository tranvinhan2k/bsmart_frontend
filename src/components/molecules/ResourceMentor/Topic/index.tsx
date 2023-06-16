import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Icon, { IconName } from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import { SX_RESOURCE_TITTLE } from './style';
import Resource from '~/components/molecules/ResourceMentor/Resource';
import { MentorNavigationActionData } from '~/constants';
import { Color } from '~/assets/variables';
import { useManageClass } from '~/hooks/useManageClass';

interface TopicProps {
  editMode: boolean;
}

export default function Topic({ editMode }: TopicProps) {
  const id = 4;
  const { classDetails } = useManageClass({ id });
  const navigate = useNavigate();
  const handleEditResource = () => {
    navigate(`edit`);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  interface TopicCreatorProps {
    id: number;
    name: string;
    iconName: IconName;
    onClickAction: () => void;
  }
  const handleCreateAnnouncement = () =>
    navigate(`/mentor-profile/${MentorNavigationActionData[13].link}`);
  const handleCreateQuiz = () =>
    navigate(`/mentor-profile/${MentorNavigationActionData[10].link}`);
  const handleCreateAssignment = () =>
    navigate(`/mentor-profile/${MentorNavigationActionData[12].link}`);

  const topicCreatorList: TopicCreatorProps[] = [
    {
      id: 0,
      name: 'Thông báo',
      iconName: 'chat',
      onClickAction: handleCreateAnnouncement,
    },
    {
      id: 1,
      name: 'Quiz',
      iconName: 'quiz',
      onClickAction: handleCreateQuiz,
    },
    {
      id: 2,
      name: 'Assignment',
      iconName: 'assignment',
      onClickAction: handleCreateAssignment,
    },
  ];

  return (
    <Box>
      {classDetails &&
        classDetails.classSectionList.map((classSection) => (
          <Box mb={2} key={classSection.id}>
            <Accordion
              sx={{
                backgroundColor: Color.white,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography sx={SX_RESOURCE_TITTLE}>
                    {classSection.name}
                  </Typography>
                  {editMode && (
                    <IconButton onClick={handleEditResource}>
                      <Icon name="modeEdit" size="small" />
                    </IconButton>
                  )}
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {classSection.activities.map((activity) => (
                    <Resource
                      key={activity.id}
                      editMode={editMode}
                      resourceName={activity.name}
                      activityId={activity.id}
                      activityTypeCode={activity.type.code}
                    />
                  ))}
                </Stack>
                {editMode && (
                  <>
                    <Box mt={2}>
                      <Button variant="outlined" onClick={handleOpenDialog}>
                        Thêm hoạt động
                      </Button>
                    </Box>
                    <Dialog
                      open={openDialog}
                      onClose={handleCloseDialog}
                      fullWidth
                      // maxWidth="lg"
                    >
                      <DialogTitle>Hoạt động</DialogTitle>
                      <DialogContent>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="stretch"
                          spacing={2}
                        >
                          {topicCreatorList.map((topicCreator) => (
                            <Grid item xs={6} sm={4} key={topicCreator.id}>
                              <Button
                                variant="outlined"
                                size="small"
                                fullWidth
                                onClick={topicCreator.onClickAction}
                                startIcon={
                                  <Icon
                                    name={topicCreator.iconName}
                                    size="medium"
                                  />
                                }
                              >
                                {topicCreator.name}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDialog}>Hủy</Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
    </Box>
  );
}
