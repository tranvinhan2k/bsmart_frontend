import { Stack, Typography } from '@mui/material';
import Section from './Section';
import { ActivityPayload } from '~/models/type';

interface Props {
  sections: ActivityPayload[];
}

export default function Content({ sections }: Props) {
  return (
    <Stack>
      {sections.length !== 0 ? (
        sections.map((section, index) => (
          <Section
            key={index}
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
