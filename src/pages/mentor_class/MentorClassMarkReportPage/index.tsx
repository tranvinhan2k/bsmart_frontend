import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { useGetIdFromUrl, useGetMentorMarkReport } from '~/hooks';
import globalStyles from '~/styles';

export interface MarkOfStudentPayload {
  id: number;
  code: string;
  name: string;
  markItems: {
    id: number;
    name: string;
    grade: number;
    time: string;
  }[];
}

export default function MentorClassMarkReportPage() {
  return <Stack>Hello World</Stack>;
}
