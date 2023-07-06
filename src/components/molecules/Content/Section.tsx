import {
  Collapse,
  IconButton,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { SectionPayload } from '~/models/section';
import Module from './Module';
import Icon from '~/components/atoms/Icon';
import { FontFamily, FontSize } from '~/assets/variables';

export default function Section({ id, modules, name }: SectionPayload) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      {id !== 0 && <Divider />}

      <Stack paddingY={2}>
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
          <Stack marginLeft={2} marginY={2}>
            {modules.map((module) => (
              <Module key={module.id} id={module.id} name={module.name} />
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
}
