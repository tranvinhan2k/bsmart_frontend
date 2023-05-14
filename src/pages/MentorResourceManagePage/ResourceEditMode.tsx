import { ChangeEvent } from 'react';
import { Stack, Switch, Typography } from '@mui/material';

interface ResourceEditModeProps {
  editMode: boolean;
  handleSetEditMode: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ResourceEditMode({
  editMode,
  handleSetEditMode,
}: ResourceEditModeProps) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Typography color="">Chế độ chỉnh sửa</Typography>
      <Switch checked={editMode} onChange={handleSetEditMode} color="info" />
    </Stack>
  );
}
