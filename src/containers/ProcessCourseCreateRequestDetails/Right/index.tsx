import { Stack } from '@mui/material';
import BasicInfo from './BasicInfo';
import RequestDate from './RequestDate';
import MentorInfo from './MentorInfo';

interface MentorRegisterRequestDetailsRightProps {
  mentorRequest: any;
}

export default function MentorRegisterRequestDetailsRight({
  mentorRequest,
}: MentorRegisterRequestDetailsRightProps) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <RequestDate mentorRequest={mentorRequest} />
      <BasicInfo mentorRequest={mentorRequest} />
      {/* <MentorInfo mentorRequest={mentorRequest} /> */}
    </Stack>
  );
}
