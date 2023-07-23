import { Box, Collapse, Stack, Typography } from '@mui/material';

import { useState } from 'react';
import { image } from '~/constants/image';
import { Color, MetricSize } from '~/assets/variables';
import AddModule from '../AddModule';
import Section from '../Section.ts';
import Module from '../Module';
import { ActivityPayload } from '~/models/type';

interface Props {
  content: ActivityPayload[] | undefined;
}

export default function Sections({ content }: Props) {
  const [open, setOpen] = useState<number>(-1);

  if (content === undefined || content.length === 0) {
    return (
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: MetricSize.large_20,
        }}
      >
        <Box
          component="img"
          alt="no section"
          src={image.emptyCourseList}
          sx={{
            height: '200px',
            width: '200px',
            objectFit: 'contain',
          }}
        />
        <Typography>Danh sách học phần đang trống .</Typography>
      </Stack>
    );
  }

  return (
    <Stack>
      {content.map((section, index) => (
        <Stack
          sx={{ marginTop: 1, padding: 2, background: Color.whiteSmoke }}
          key={index}
        >
          <Section
            open={open === index}
            index={index}
            section={section}
            onOpenContentSection={() => setOpen(open !== index ? index : -1)}
          />
          <Collapse in={open === index}>
            <Stack sx={{ marginTop: 1, paddingY: 1 }}>
              {section?.subActivities.map((module, idx) => (
                <Module
                  key={idx}
                  index={idx}
                  sectionId={section.id}
                  module={module}
                />
              ))}
            </Stack>
            <AddModule id={section.id} />
          </Collapse>
        </Stack>
      ))}
    </Stack>
  );
}
