import { Stack } from '@mui/material';
import TextLine from '~/components/atoms/TextLine';

interface ReadOneSubjectProps {
  row: { id: number; code: string; name: string; categoryId: string };
}

export default function ReadOneSubject({ row }: ReadOneSubjectProps) {
  return (
    <Stack>
      <TextLine label="ID" variable={`${row.id}`} />
      <TextLine label="Mã ngôn ngữ lập trình" variable={row.code} />
      <TextLine label="Tên ngôn ngữ lập trình" variable={row.name} />
      <TextLine label="Id môn học" variable={row.categoryId} />
    </Stack>
  );
}
