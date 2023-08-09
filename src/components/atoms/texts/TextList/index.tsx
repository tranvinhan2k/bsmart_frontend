import { Stack, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { FontSize, FontFamily, Color } from '~/assets/variables';
import Timetable, { TimetablePayload } from '~/components/molecules/Timetable';
import { image } from '~/constants/image';
import globalStyles from '~/styles';

export type TextListPayload = {
  id?: number;
  name: string;
  alt?: string;
} & (
  | {
      type: 'text' | 'image';
      value: string;
    }
  | {
      type: 'custom';
      value: React.ReactNode;
    }
  | {
      type: 'timetable';
      timetable?: TimetablePayload[];
    }
);

interface Props {
  items: TextListPayload[];
}

export default function TextList({ items }: Props) {
  const [error, setError] = useState(false);

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
            {item?.type === 'image' && (
              <Box
                component="img"
                src={error ? image.noCourse : item.value}
                alt={item.alt}
                onError={() => setError(true)}
                sx={{
                  width: '50%',
                  height: undefined,
                  aspectRatio: 16 / 9,
                  objectFit: 'cover',
                }}
              />
            )}
            {item?.type === 'timetable' && (
              <Timetable data={item?.timetable || []} />
            )}
            {item?.type === 'text' && `${item.value}`}
            {item?.type === 'custom' && item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
