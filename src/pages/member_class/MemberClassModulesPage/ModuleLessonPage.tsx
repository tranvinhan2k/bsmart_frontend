import { Stack, Typography } from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';
import { ActivityLessonPayload } from '~/models/type';
import globalStyles from '~/styles';

interface Props {
  name: string;
  item: ActivityLessonPayload;
}

export default function ModuleLessonPage({ name, item }: Props) {
  return (
    <Stack
      sx={{
        ...globalStyles.viewCenter,
      }}
      marginTop={1}
    >
      <Typography
        textAlign="center"
        sx={{
          fontSize: FontSize.medium_24,
          fontFamily: FontFamily.medium,
        }}
      >
        {name}
      </Typography>
      <Stack marginTop={1} />
      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
        dangerouslySetInnerHTML={{
          __html: item.description,
        }}
      />
    </Stack>
  );
}
