import { Typography } from '@mui/material';
import { MentorProfileStatusType } from '~/constants/profile';
import MemberUpdateProfileButton from './MemberUpdateProfileButton';
import MentorUpdateProfileButton from './MentorUpdateProfileButton';

interface UpdateProfileButtonProps {
  role: string;
  mentorProfileStatus: MentorProfileStatusType;
}

export default function UpdateProfileButton({
  role,
  mentorProfileStatus,
}: UpdateProfileButtonProps) {
  switch (role) {
    case 'TEACHER':
      return <MentorUpdateProfileButton status={mentorProfileStatus} />;
    case 'STUDENT':
      return <MemberUpdateProfileButton />;
    default:
      return <Typography color="red">Đã xảy ra lỗi</Typography>;
  }
}
