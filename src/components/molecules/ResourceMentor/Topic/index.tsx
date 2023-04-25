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
import { SX_RESOURCE_TITTLE, SX_RESOURCE_ITEM_CONTAINER } from './style';
import Resource from '~/components/molecules/ResourceMentor/Resource';

interface TopicProps {
  editMode: boolean;
}

export default function Topic({ editMode }: TopicProps) {
  const navigation = useNavigate();
  const handleEditResource = () => {
    navigation(`edit`);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  interface ResourceProps {
    id: number;
    name: string;
    iconName: IconName;
  }
  interface TopicCreatorProps {
    id: number;
    name: string;
    iconName: IconName;
  }

  const resourceTmpList: ResourceProps[] = [
    { id: 0, name: 'Thông báo 1', iconName: 'chat' },
    { id: 1, name: 'Bài quiz 1', iconName: 'quiz' },
  ];

  const topicCreatorList: TopicCreatorProps[] = [
    { id: 0, name: 'Thông báo', iconName: 'chat' },
    { id: 1, name: 'Quiz', iconName: 'quiz' },
  ];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={SX_RESOURCE_TITTLE}>Hoạt động 1</Typography>
          {editMode && (
            <IconButton sx={{ padding: 0 }} onClick={handleEditResource}>
              <Icon name="modeEdit" size="small" />
            </IconButton>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {resourceTmpList.map((resource) => (
            <Resource
              key={resource.id}
              editMode={editMode}
              resourceName={resource.name}
              resourceIconName={resource.iconName}
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
              maxWidth="lg"
            >
              <DialogTitle>Đề mục mới</DialogTitle>
              <DialogContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  spacing={2}
                >
                  {topicCreatorList.map((topicCreator) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2}
                      key={topicCreator.id}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        startIcon={
                          <Icon name={topicCreator.iconName} size="medium" />
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
  );
}
