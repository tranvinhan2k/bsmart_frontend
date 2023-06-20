import {
  Button as MuiButton,
  Box,
  Link,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon, { IconName } from '~/components/atoms/Icon';
import { MentorNavigationActionData } from '~/constants';
import { ActivityTypeCode } from '~/models/activity';
import { SX_RESOURCE_ITEM_CONTAINER } from './style';

interface ResourceProps {
  editMode: boolean;
  resourceName: string;
  activityId: number;
  activityTypeCode: ActivityTypeCode;
}

export default function Resource({
  editMode,
  resourceName,
  activityId,
  activityTypeCode,
}: ResourceProps) {
  let resourceIconName: IconName = 'chat';
  let linkEdit: string;
  let linkViewDetails: string;

  switch (activityTypeCode) {
    case ActivityTypeCode.QUIZ:
      resourceIconName = 'quiz';
      linkViewDetails = `/mentor-profile/${
        MentorNavigationActionData[1].items?.[3].link.split('/')[0]
      }/${activityId}`;
      linkEdit = `/mentor-profile/${
        MentorNavigationActionData[1].items?.[3].link.split('/')[0]
      }/${activityId}`;
      break;
    case ActivityTypeCode.ASSIGNMENT:
      resourceIconName = 'assignment';
      linkViewDetails = `/mentor-profile/${
        MentorNavigationActionData[1].items?.[15].link.split('/')[0]
      }/${activityId}`;
      linkEdit = `/mentor-profile/${
        MentorNavigationActionData[1].items?.[14].link.split('/')[0]
      }/${activityId}`;
      break;
    case ActivityTypeCode.ANNOUNCEMENT:
      resourceIconName = 'chat';
      linkViewDetails = `/mentor-profile/${
        MentorNavigationActionData[1].items?.[15].link.split('/')[0]
      }/${activityId}`;
      linkEdit = `/mentor-profile/${
        MentorNavigationActionData[1].items?.[15].link.split('/')[0]
      }/${activityId}`;
      break;
    default:
      resourceIconName = 'redo';
      linkViewDetails = '';
      linkEdit = '';
      break;
  }

  const navigation = useNavigate();
  const handleViewDetailsResource = () => navigation(linkViewDetails);
  const handleEditResource = () => navigation(linkEdit);

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
        <Link
          href={linkViewDetails}
          underline="none"
          onClick={handleViewDetailsResource}
          sx={{ fontFamily: FontFamily.regular }}
        >
          {resourceName}
        </Link>

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
