import { Box, Stack, Typography } from '@mui/material';
import { Color, FontFamily } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { ActivityData } from '~/constants';
import { ActivityKeys } from '~/models/variables';

interface Props {
  type: ActivityKeys;
}
export default function SubActivityHeader({ type }: Props) {
  const activityData = ActivityData.find((item) => item.type === type);

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        background: Color.navy,
        borderRadius: 1.25,
        padding: 1,
        width: 110,
      }}
    >
      <Icon name={activityData?.icon} size="small_20" color="white" />
      <Box sx={{ width: '100%' }}>
        <Typography
          textAlign="center"
          noWrap
          sx={{
            color: Color.white,
            fontFamily: FontFamily.medium,
            fontSize: 14,
            marginLeft: 0.5,
          }}
        >
          {activityData?.label}
        </Typography>
      </Box>
    </Stack>
  );
}
