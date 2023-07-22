import {
  Collapse,
  IconButton,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import Module from './Module';
import Icon from '~/components/atoms/Icon';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import { ActivityPayload } from '~/models/type';

export default function Section({
  id,
  subActivities,
  name,
}: {
  id: number;
  name: string;
  subActivities: ActivityPayload[];
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      <Stack
        sx={{
          background: Color.white4,
          paddingX: 2,
          paddingY: 1,
          marginY: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_16,
              fontFamily: FontFamily.medium,
            }}
          >
            {name}
          </Typography>
          <IconButton
            sx={{
              transition: 'all 1s ease',
              transform: open ? 'rotate(90deg)' : 'none',
            }}
            onClick={handleOpen}
          >
            <Icon name="right" size="small_20" color="black" />
          </IconButton>
        </Stack>

        <Collapse in={open}>
          <Stack marginTop={1}>
            {subActivities.map((module) => (
              <Module key={module.id} id={module.id} name={module.name} />
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
}
