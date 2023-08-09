import { Chip } from '@mui/material';

interface RenderAttendanceStatusProps {
  input: string;
}
export function RenderAttendanceStatus({ input }: RenderAttendanceStatusProps) {
  switch (input) {
    case 'PRESENT':
      return (
        <Chip
          color="success"
          size="small"
          label="Đã tham gia"
          title="Đã tham gia"
        />
      );
    case 'ABSENT':
      return (
        <Chip
          color="error"
          size="small"
          label="Không tham gia"
          title="Không tham gia"
        />
      );

    default:
      return (
        <Chip
          color="default"
          size="small"
          label="Chưa điểm danh"
          title="Chưa điểm danh"
        />
      );
  }
}
