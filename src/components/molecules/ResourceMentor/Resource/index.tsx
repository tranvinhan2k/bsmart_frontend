import { IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { ActivityTypeCode } from '~/models/class';
import { SX_RESOURCE_ITEM_CONTAINER } from './style';

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
