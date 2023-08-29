import { Stack, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { ActivityData } from '~/constants';
import { ActivityKeys } from '~/models/variables';

export default function ModuleHeader({
  type,
  index,
}: {
  type: ActivityKeys;
  index: number;
}) {
  const activityData = ActivityData.find((item) => item.type === type);

  let color = Color.tertiary;

  switch (type) {
    case 'ASSIGNMENT':
      color = Color.orange;
      break;
    case 'LESSON':
      color = Color.navy;
      break;
    case 'RESOURCE':
      color = Color.green;
      break;
    case 'QUIZ':
      color = Color.blue;
      break;
    default:
      break;
  }

  return (
    <Stack
      style={{
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: FontFamily.bold,
        background: color,
        width: '120px',
        padding: MetricSize.small_10,
        borderRadius: MetricSize.small_5,
      }}
    >
      <Stack
        sx={{
          position: 'absolute',
          left: MetricSize.small_5,
          top: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name={activityData?.icon} size="small_20" color="white" />
      </Stack>

      <Typography
        sx={{
          marginLeft: 2,
          textAlign: 'center',
          color: Color.white,
          fontFamily: FontFamily.medium,
          fontSize: FontSize.small_14,
        }}
      >
        {activityData?.label}
      </Typography>
    </Stack>
  );
}
