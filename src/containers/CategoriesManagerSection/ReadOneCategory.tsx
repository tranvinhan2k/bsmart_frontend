import { Stack } from '@mui/material';
import TextLine from '~/components/atoms/TextLine';

interface ReadOneCategoryProps {
  row: { id: number; code: string; name: string };
}

export default function ReadOneCategory({ row }: ReadOneCategoryProps) {
  return (
    <Stack>
      <TextLine label="ID" variable={`${row.id}`} />
      <TextLine label="Mã môn học" variable={row.code} />
      <TextLine label="Tên môn học" variable={row.name} />
    </Stack>
  );
}
