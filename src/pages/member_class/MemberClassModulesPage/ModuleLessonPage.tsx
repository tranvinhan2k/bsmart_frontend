import { Stack, Typography } from '@mui/material';
import { ActivityLessonPayload } from '~/models/type';
import globalStyles from '~/styles';

interface Props {
  name: string;
  item: ActivityLessonPayload;
}

export default function ModuleLessonPage({ name, item }: Props) {
  return (
    <Stack marginTop={1}>
      <Typography sx={globalStyles.textSmallLabel}>{name}</Typography>
      <Stack marginTop={1} />
      <Typography
        sx={globalStyles.textSmallLight}
        dangerouslySetInnerHTML={{
          __html: item.description,
        }}
      />
    </Stack>
  );
}
