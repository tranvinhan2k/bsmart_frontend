import { Stack } from '@mui/material';
import { useContext } from 'react';
import { ClassContext } from '~/HOCs/context/ClassContext';
import TextTitle from '~/components/atoms/texts/TextTitle';
import UserDetailInformation from '~/components/molecules/UserDetailInformation';
import { image } from '~/constants/image';
import { MentorClassDetailPayload } from '~/pages/mentor_class/MentorClassStudentDetailPage';
import globalStyles from '~/styles';

export default function MemberClassMentorDetailPage() {
  const { detailClass } = useContext(ClassContext);
  const mentor: MentorClassDetailPayload = {
    name: detailClass?.teacherName?.[0] || '',
    phone: detailClass?.teacherPhone || '',
    email: detailClass?.teacherMail || '',
    attendanceInformation: {
      timeSlotLeft: 5,
      timeSlotOff: 3,
    },
    id: 0,
    imageUrl: detailClass?.teacherUrl || '',
    imageAlt: detailClass?.teacherAlt || '',
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
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <UserDetailInformation
          email={mentor.email}
          imageAlt={mentor.imageAlt}
          imageUrl={mentor.imageUrl}
          name={mentor.name}
          phone={mentor.phone}
          isHidePoint
        />
      </Stack>
    </Stack>
  );
}
