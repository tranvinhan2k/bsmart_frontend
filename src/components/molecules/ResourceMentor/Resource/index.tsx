import { IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';
import Icon, { IconName } from '~/components/atoms/Icon';
import { MentorNavigationActionData } from '~/constants';
import { SX_RESOURCE_ITEM_CONTAINER } from './style';
import { ActivityTypeCode } from '~/models/activity';

interface ResourceProps {
  editMode: boolean;
  resourceName: string;

  activityTypeCode: ActivityTypeCode;
}

export default function Resource({
  editMode,
  resourceName,
  activityTypeCode,
}: ResourceProps) {
  let resourceIconName: IconName = 'chat';
  let editLinkTo: string;

  switch (activityTypeCode) {
    case ActivityTypeCode.QUIZ:
      resourceIconName = 'quiz';
      linkViewDetails = `/mentor-profile/${
        MentorNavigationActionData[4].items?.[0].link.split('/')[0]
      }/${activityId}`;
      linkEdit = `/mentor-profile/${
        MentorNavigationActionData[4].items?.[0].link.split('/')[0]
      }/${activityId}`;
      break;
    case ActivityTypeCode.ASSIGNMENT:
      resourceIconName = 'assignment';
      linkViewDetails = `/mentor-profile/${
        MentorNavigationActionData[4].items?.[2].link.split('/')[0]
      }/${activityId}`;
      linkEdit = `/mentor-profile/${
        MentorNavigationActionData[4].items?.[3].link.split('/')[0]
      }/${activityId}`;
      break;
    default:
      resourceIconName = 'redo';
      editLinkTo = '';
      break;
  }

  const navigation = useNavigate();
  const handleEditResource = () => {
    navigation(editLinkTo);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={SX_RESOURCE_ITEM_CONTAINER}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Icon name={resourceIconName} size="medium" />
        <Typography>{resourceName}</Typography>

        {editMode && (
          <IconButton onClick={handleEditResource}>
            <Icon name="modeEdit" size="small" />
          </IconButton>
        )}
      </Stack>
      <Button variant="outlined">Hoàn thành</Button>
    </Stack>
  );
}
