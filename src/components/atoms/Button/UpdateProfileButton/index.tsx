import { Typography } from '@mui/material';
import { MentorProfileStatusType } from '~/constants/profile';
import MemberUpdateProfileButton from './MemberUpdateProfileButton';
import MentorUpdateProfileButton from './MentorUpdateProfileButton';

interface UpdateProfileButtonProps {
  role: string;
  mentorProfileStatus: MentorProfileStatusType;
  isFormDisabled: boolean;
}

export default function UpdateProfileButton({
  role,
  mentorProfileStatus,
  isFormDisabled,
}: UpdateProfileButtonProps) {
  switch (role) {
    case 'TEACHER':
      return (
        <MentorUpdateProfileButton
          isFormDisabled={isFormDisabled}
          status={mentorProfileStatus}
        />
      );
    case 'STUDENT':
      return <MemberUpdateProfileButton isFormDisabled={isFormDisabled} />;
    default:
      return <Typography color="red">Đã xảy ra lỗi</Typography>;
  }
}
