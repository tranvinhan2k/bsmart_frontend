import { Stack, Typography, Box } from '@mui/material';
import { FontSize, FontFamily, Color } from '~/assets/variables';
import Timetable, { TimetablePayload } from '~/components/molecules/Timetable';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';

export interface TextListPayload {
  id?: number;
  name: string;
  value?: string;
  alt?: string;
  type?: 'text' | 'image' | 'timetable';
  timetable?: TimetablePayload[];
}

interface Props {
  items: TextListPayload[];
}

export default function TextList({ items }: Props) {
  return (
    <Stack>
      {items.map((item, index) => (
        <Stack key={index}>
          <Typography
            sx={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.bold,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              marginY: 1,
              ...globalStyles.textLowSmallLight,
              color: Color.black,
            }}
          >
            {item.type === 'image' && (
              <Box
                component="img"
                src={item.value}
                alt={item.alt}
                sx={{
                  width: '50%',
                  height: undefined,
                  aspectRatio: 16 / 9,
                  objectFit: 'cover',
                }}
              />
            )}
            {item.type === 'timetable' && (
              <Timetable data={item?.timetable || []} />
            )}
            {!item.type && `${item.value}`}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
