import { ChangeEvent } from 'react';
import { Stack, Switch, Typography } from '@mui/material';

interface CustomSwitchProps {
  text: string;
  editMode: boolean;
  handleSetEditMode: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomSwitch({
  text,
  editMode,
  handleSetEditMode,
}: CustomSwitchProps) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Typography color="">{text}</Typography>
      <Switch checked={editMode} onChange={handleSetEditMode} color="info" />
    </Stack>
  );
}
