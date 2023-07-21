import { Stack, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { ActivityKeys } from '~/models/variables';

export default function ModuleHeader({
  type,
  index,
}: {
  type: ActivityKeys;
  index: number;
}) {
  switch (type) {
    case 'RESOURCE':
      return (
        <Stack
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            fontFamily: FontFamily.bold,
            background: '#0A4D68',
            width: '100px',
            padding: MetricSize.small_10,
            borderRadius: MetricSize.small_5,
          }}
        >
          <Icon name="course" size="small_20" color="white" />
          <Stack
            sx={{
              marginLeft: 1,
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                color: Color.white,
                fontFamily: FontFamily.medium,
                fontSize: FontSize.small_14,
              }}
            >
              Tài nguyên
            </Typography>
          </Stack>
        </Stack>
      );
      break;
    case 'ASSIGNMENT':
      return (
        <Stack
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            fontFamily: FontFamily.bold,
            background: '#088395',
            width: '100px',
            padding: MetricSize.small_10,
            borderRadius: MetricSize.small_5,
          }}
        >
          <Icon name="course" size="small_20" color="white" />
          <Typography
            sx={{
              marginLeft: 1,

              textAlign: 'center',
              color: Color.white,
              fontFamily: FontFamily.medium,
              fontSize: FontSize.small_14,
            }}
          >
            Bài tập
          </Typography>
        </Stack>
      );
      break;
    case 'QUIZ':
      return (
        <Stack
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            fontFamily: FontFamily.bold,
            background: '#00FFCA',
            width: '100px',
            padding: MetricSize.small_10,
            borderRadius: MetricSize.small_5,
          }}
        >
          <Icon name="course" size="small_20" color="white" />
          <Typography
            sx={{
              marginLeft: 1,
              textAlign: 'center',
              color: Color.white,
              fontFamily: FontFamily.medium,
              fontSize: FontSize.small_14,
            }}
          >
            Kiểm tra
          </Typography>
        </Stack>
      );
      break;
    default:
      return (
        <Stack
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            fontFamily: FontFamily.bold,
            background: '#05BFDB',
            width: '100px',
            padding: MetricSize.small_10,
            borderRadius: MetricSize.small_5,
          }}
        >
          <Icon name="course" size="small_20" color="white" />
          <Typography
            sx={{
              marginLeft: 1,
              textAlign: 'center',
              color: Color.white,
              fontFamily: FontFamily.medium,
              fontSize: FontSize.small_14,
            }}
          >
            Bài học
          </Typography>
        </Stack>
      );
  }
}
