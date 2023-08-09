import { Box, Stack, Typography } from '@mui/material';
import { FontSize, FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';

interface Props {
  name: string;
  description?: string;
}

export default function ModuleActivity({ name, description }: Props) {
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
      {description && (
        <Stack marginTop={1}>
          <Typography textAlign="center" sx={globalStyles.textSmallLabel}>
            Mô tả
          </Typography>
          <Typography
            textAlign="center"
            sx={globalStyles.textLowSmallLight}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}
