import { Stack, Typography, Divider, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import ReturnLink from '~/components/atoms/ReturnLink';
import UserDetailInformation from '~/components/molecules/UserDetailInformation';
import { image } from '~/constants/image';
import globalStyles from '~/styles';

export interface MentorClassDetailPayload {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  imageAlt: string;
  attendanceInformation: {
    timeSlotOff: number;
    timeSlotLeft: number;
  };
  points: {
    id: number;
    name: string;
    value: number;
  }[];
}

export default function MentorClassStudentDetailPage() {
  const student: MentorClassDetailPayload = {
    name: 'Trần Vĩ Nhân',
    phone: '0362017512',
    email: 'tranvinhan2k@gmail.com',
    attendanceInformation: {
      timeSlotLeft: 5,
      timeSlotOff: 3,
    },
    id: 0,
    imageUrl: image.mockStudent,
    imageAlt: 'hinh anh hoc sinh',
    points: [
      {
        id: 0,
        name: 'Kiểm tra 15 phút',
        value: 9.5,
      },
      {
        id: 0,
        name: 'Kiểm tra 1 tiết',
        value: 9.5,
      },
    ],
  };

  return (
    <Stack>
      <ReturnLink />
      <Typography sx={globalStyles.textSubTitle}>Chi tiết học sinh</Typography>
      <Divider />
      <UserDetailInformation
        email={student.email}
        imageAlt={student.imageAlt}
        imageUrl={student.imageUrl}
        name={student.name}
        phone={student.phone}
      />
    </Stack>
  );
}
