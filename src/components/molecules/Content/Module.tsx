import TextPropLine from '~/components/atoms/texts/TextPropLine';

export default function Module({ id, name }: { id: number; name: string }) {
  return (
    <TextPropLine icon="course" label={`Bài học ${id + 1}`} value={name} />
  );
}
