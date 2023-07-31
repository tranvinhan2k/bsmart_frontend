import { Typography, Stack } from '@mui/material';
import Icon, { IconName } from '~/components/atoms/Icon';
import { SubActivityOfCourseCreateRequestDetails } from '~/models/courses';

interface SubActivityProcessCourseCreateRequestProps {
  subActivity: SubActivityOfCourseCreateRequestDetails;
}

export default function SubActivityProcessCourseCreateRequest({
  subActivity,
}: SubActivityProcessCourseCreateRequestProps) {
  let iconName: IconName;
  switch (subActivity.type) {
    case 'LESSON':
      iconName = 'lesson';
      break;
    case 'ASSIGNMENT':
      iconName = 'assignment';
      break;
    case 'QUIZ':
      iconName = 'quiz';
      break;
    case 'RESOURCE':
      iconName = 'resource';
      break;
    default:
      iconName = 'edit';
      break;
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      my={3}
    >
      <Icon name={iconName} size="small_20" color="black" />
      <Typography>{subActivity.name}</Typography>
    </Stack>
  );
}
