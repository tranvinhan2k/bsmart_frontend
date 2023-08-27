import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import MarkDisplay from '~/components/atoms/MarkDisplay';
import { ActivityAssignmentPayload } from '~/models/type';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';
import ModuleActivity from './ModuleActivity';
import {
  formatISODateDateToDisplayDateTime,
  formatISODateStringToDisplayDateTime,
} from '~/utils/date';
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
