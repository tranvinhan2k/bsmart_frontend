import { Collapse, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '../Icon';

interface CollapseStackProps {
  label: string;
  children: any;
}

export default function CollapseStack({ label, children }: CollapseStackProps) {
  const [visibleCollapse, setVisibleCollapse] = useState<boolean>(true);

  const handleTriggerCollapse = () => {
    setVisibleCollapse(!visibleCollapse);
  };

  return (
    <Stack
      sx={{
        width: '100%',
        borderRadius: '10px',
        background: Color.white,
        boxShadow: 2,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderBottomLeftRadius: visibleCollapse ? 0 : '10px',
          borderBottomRightRadius: visibleCollapse ? 0 : '10px',
          background: Color.white,
          padding: MetricSize.small_10,
          transition: 'all 200ms',
          borderBottom: visibleCollapse ? '1px solid grey' : 0,
        }}
      >
        <Typography
          sx={{ fontFamily: FontFamily.medium, fontSize: FontSize.small_18 }}
        >
          {label}
        </Typography>
        <Stack
          sx={{
            transform: visibleCollapse ? 'none' : 'rotate(-90deg)',
            transition: 'transform 0.5s',
          }}
        >
          <IconButton onClick={handleTriggerCollapse}>
            <Icon name="down" size="small" />
          </IconButton>
        </Stack>
      </Stack>
      <Collapse in={visibleCollapse}>
        <Stack padding={1}>{children}</Stack>
      </Collapse>
    </Stack>
  );
}
