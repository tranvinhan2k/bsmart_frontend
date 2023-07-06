import { Drawer, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import DefaultSidebarLeft from './DefaultSidebarLeft';
import { ActionPayload } from '~/models';

export default function DefaultSidebarTop({ data }: { data: ActionPayload[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Stack>
      <Stack
        sx={{
          position: 'absolute',
          top: MetricSize.small_10,
          left: MetricSize.small_10,
        }}
      >
        <IconButton onClick={() => setOpen(!open)}>
          <Icon name="menu" size="small_20" color="black" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
