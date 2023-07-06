import { Stack } from '@mui/material';
import { SectionPayload } from '~/models/section';
import Section from './Section';

interface Props {
  sections: SectionPayload[];
}

export default function Content({ sections }: Props) {
  return (
    <Stack>
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          modules={section.modules}
          name={section.name}
        />
      ))}
    </Stack>
  );
}
