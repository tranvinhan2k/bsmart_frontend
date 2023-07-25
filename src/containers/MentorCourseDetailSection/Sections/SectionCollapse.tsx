import { Stack, Collapse } from '@mui/material';
import { forwardRef, useState } from 'react';
import { Color } from '~/assets/variables';
import AddModule from '../AddModule';
import Module from '../Module';
import Section from '../Section.ts';
import { ActivityPayload } from '~/models/type';
import { CourseStatusKeys } from '~/models/variables';

interface Props {
  status: CourseStatusKeys;
  index: number;
  section: ActivityPayload;
}

// eslint-disable-next-line react/display-name
const SectionCollapse = forwardRef(({ index, section, status }: Props, ref) => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Stack
      ref={ref as any}
      sx={{ marginTop: 1, padding: 2, background: Color.whiteSmoke }}
    >
      <Section
        open={open}
        index={index}
        section={section}
        onOpenContentSection={handleOpen}
      />
      <Collapse in={open}>
        <Stack
          sx={{
            marginTop: section.subActivities.length !== 0 ? 1 : 0,
          }}
        >
          {section?.subActivities.map((module, idx) => (
            <Module
              key={idx}
              index={idx}
              sectionId={section.id}
              module={module}
            />
          ))}
        </Stack>
        {(status === 'EDITREQUEST' || status === 'REQUESTING') && (
          <AddModule id={section.id} />
        )}
      </Collapse>
    </Stack>
  );
});

export default SectionCollapse;
