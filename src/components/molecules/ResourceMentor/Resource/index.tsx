import { useNavigate } from 'react-router-dom';
import { IconButton, Typography, Stack } from '@mui/material';
import Icon, { IconName } from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import { SX_RESOURCE_ITEM_CONTAINER } from './style';

interface ResourceProps {
  editMode: boolean;
  resourceName: string;
  resourceIconName: IconName;
  editLinkTo: string;
}

export default function Resource({
  editMode,
  resourceName,
  resourceIconName,
  editLinkTo,
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
