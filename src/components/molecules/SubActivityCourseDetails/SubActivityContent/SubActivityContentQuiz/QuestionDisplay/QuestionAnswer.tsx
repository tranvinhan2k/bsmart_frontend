import { Stack, Typography } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';

interface QuestionAnswerListProps {
  value: string;
}
export default function QuestionAnswer({ value }: QuestionAnswerListProps) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingY: MetricSize.small_5,
      }}
    >
      <Icon name="answer" size="small_20" color="black" />
      <Stack height="100%">
        <Typography
          sx={{
            marginLeft: 1,
            fontSize: FontSize.small_14,
            fontFamily: FontFamily.light,
          }}
        >
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
