import { Stack } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import TextPropLine from '~/components/atoms/texts/TextPropLine';

export default function Module({ id, name }: { id: number; name: string }) {
  return (
    <Stack
      sx={{
        background: Color.white,
        padding: 1,
        borderRadius: MetricSize.small_5,
      }}
    >
      <TextPropLine icon="course" label={`Bài học ${id + 1}`} value={name} />
    </Stack>
  );
}
