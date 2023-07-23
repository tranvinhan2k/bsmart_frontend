import { Stack } from '@mui/material';
import TextTitle from '~/components/atoms/texts/TextTitle';
import UserDetailInformation from '~/components/molecules/UserDetailInformation';
import { image } from '~/constants/image';
import { MentorClassDetailPayload } from '~/pages/mentor_class/MentorClassStudentDetailPage';

export default function MemberClassMentorDetailPage() {
  const mentor: MentorClassDetailPayload = {
    name: 'Trần Vĩ Nhân',
    phone: '0362017512',
    email: 'tranvinhan2k@gmail.com',
    attendanceInformation: {
      timeSlotLeft: 5,
      timeSlotOff: 3,
    },
    id: 0,
    imageUrl: image.mockTeacherAvatar,
    imageAlt: 'hinh anh giao vien',
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
      <TextTitle title="Thông tin giáo viên" />
      <UserDetailInformation
        email={mentor.email}
        imageAlt={mentor.imageAlt}
        imageUrl={mentor.imageUrl}
        name={mentor.name}
        phone={mentor.phone}
      />
    </Stack>
  );
}
