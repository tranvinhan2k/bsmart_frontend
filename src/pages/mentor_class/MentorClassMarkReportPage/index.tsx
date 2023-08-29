import { Stack } from '@mui/material';

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
