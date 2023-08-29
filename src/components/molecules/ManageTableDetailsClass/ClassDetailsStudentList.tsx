import { Box } from '@mui/material';
import RequestCourseClassStudentList from '../ManageTableSupport/RequestCourseClassStudentList';

interface ClassDetailsStudentListProps {
  idClass: number;
  scrollRef: any;
}

export default function ClassDetailsStudentList({
  idClass,
  scrollRef,
}: ClassDetailsStudentListProps) {
  return (
    <Box ref={scrollRef}>
      <RequestCourseClassStudentList idClass={idClass} />
    </Box>
  );
}
