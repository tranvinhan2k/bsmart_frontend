import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { ModulePayload } from '~/models/section';

export default function Module({ id, name }: ModulePayload) {
  return (
    <TextPropLine icon="course" label={`Bài học ${id + 1}`} value={name} />
  );
}
