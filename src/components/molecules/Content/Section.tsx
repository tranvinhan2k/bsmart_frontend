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
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { ActivityPayload } from '~/models/type';

export default function Section({
  id,
  subActivities,
  name,
  index,
  readOnly = false,
}: {
  id: number;
  name: string;
  index: number;
  subActivities: ActivityPayload[];
  readOnly: boolean;
}) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      <Stack
        sx={{
          position: 'relative',
          background: Color.white,
          border: '1px solid #ddd',
          borderRadius: MetricSize.small_5,
          padding: 2,
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
            {`Học phần ${index + 1}: ${name}`}
          </Typography>
          <IconButton
            sx={{
              transition: 'all 1s ease',
              transform: open ? 'rotate(90deg)' : 'none',
              width: '25px',
              height: '25px',
            }}
            onClick={handleOpen}
          >
            <Icon name="right" size="small_20" color="black" />
          </IconButton>
        </Stack>

        <Collapse in={open}>
          {subActivities.map((module, idx) => (
            <Module
              readOnly={readOnly}
              sectionId={id}
              key={module.id}
              id={module.id}
              index={idx}
              name={module.name}
              status={module.type}
            />
          ))}
        </Collapse>
      </Stack>
    </Stack>
  );
}
