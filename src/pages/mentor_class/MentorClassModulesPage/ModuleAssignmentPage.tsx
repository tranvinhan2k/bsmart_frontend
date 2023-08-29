import { Stack, Typography } from '@mui/material';
import { ActivityAssignmentPayload } from '~/models/type';
import globalStyles from '~/styles';
import ModuleActivity from './ModuleActivity';
import MentorClassAssignmentPage from '../MentorClassAssignmentPage';

interface Props {
  name: string;
  item: ActivityAssignmentPayload;
}

export default function ModuleAssignmentPage({ name, item }: Props) {
  return (
    <Stack marginTop={1}>
      <ModuleActivity name={name} description={item.description} />
      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
      >{`Thời gian cho chỉnh sửa: ${item.editBeForSubmitMin} phút`}</Typography>

      <MentorClassAssignmentPage assignmentId={item.assignmentId} />
    </Stack>
  );
}
