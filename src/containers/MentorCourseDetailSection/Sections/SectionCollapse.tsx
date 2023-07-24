import { Stack, Collapse } from '@mui/material';
import { useState } from 'react';
import { Color } from '~/assets/variables';
import AddModule from '../AddModule';
import Module from '../Module';
import Section from '../Section.ts';
import { ActivityPayload } from '~/models/type';

interface Props {
  index: number;
  section: ActivityPayload;
}

export default function SectionCollapse({ index, section }: Props) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Stack sx={{ marginTop: 1, padding: 2, background: Color.whiteSmoke }}>
      <Section
        open={open}
        index={index}
        section={section}
        onOpenContentSection={handleOpen}
      />
      <Collapse in={open}>
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
  );
}
