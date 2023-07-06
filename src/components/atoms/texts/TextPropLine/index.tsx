import { Stack, Typography } from '@mui/material';
import Icon, { IconName } from '../../Icon';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';

interface Props {
  icon: IconName;
  label: string;
  value: string;
}

export default function TextPropLine({ icon, label, value }: Props) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingY: MetricSize.small_5,
      }}
    >
      <Icon name={icon} size="small_20" color="black" />
      <Stack height="100%">
        <Typography
          sx={{
            marginLeft: 1,
            fontSize: FontSize.small_14,
            fontFamily: FontFamily.light,
          }}
        >
          {`${label}: `}
          <span
            style={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.medium,
            }}
          >
            {value}
          </span>
        </Typography>
      </Stack>
    </Stack>
  );
}
