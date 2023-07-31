import { Stack, Typography } from '@mui/material';
import Section from './Section';
import { ActivityPayload } from '~/models/type';

interface Props {
  courseId?: number;
  readOnly?: boolean;
  sections: ActivityPayload[];
}

export default function Content({
  sections,
  courseId,
  readOnly = false,
}: Props) {
  return (
    <Stack>
      {sections.length !== 0 ? (
        sections.map((section, index) => (
          <Section
            readOnly={readOnly}
            key={index}
            index={index}
            id={section.id}
            subActivities={section.subActivities}
            name={section.name}
          />
        ))
      ) : (
        <Typography padding={1}>Chưa có học phần nào</Typography>
      )}
    </Stack>
  );
}
