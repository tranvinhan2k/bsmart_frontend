import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, MetricSize } from '~/assets/variables';
import { image } from '~/constants/image';
import { ActivityKeys } from '~/models/variables';
import globalStyles from '~/styles';

interface Props {
  sectionId: number;
}

export default function ChooseTypeOfSubSection({ sectionId }: Props) {
  const navigate = useNavigate();

  const data: {
    id: number;
    name: string;
    type: ActivityKeys;
  }[] = [
    {
      id: 0,
      name: 'Bài học',
      type: 'LESSON',
    },
    {
      id: 0,
      name: 'Tài nguyên',
      type: 'RESOURCE',
    },
    {
      id: 0,
      name: 'Kiểm tra',
      type: 'QUIZ',
    },
    {
      id: 0,
      name: 'Bài tập',
      type: 'ASSIGNMENT',
    },
  ];

  const onChooseType = (type: string) => {
    navigate(`${sectionId}/add/${type.toLowerCase()}`);
  };

  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
      {data.map((item, index) => {
        return (
          <Stack
            onClick={() => onChooseType(item.type)}
            key={index}
            sx={{
              filter: 'grayscale(1)',
              transition: 'all 200ms ease',
              border: '2px solid transparent',
              background: Color.white,
              borderRadius: MetricSize.small_5,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 1,
              marginY: 1,
              height: '100px',
              aspectRatio: 1,
              ':hover': {
                borderColor: Color.tertiary,
                color: Color.navy,
                background: `${Color.tertiary}22`,
                cursor: 'pointer',
                filter: 'none',
              },
            }}
          >
            <Box
              component="img"
              src={image.study}
              sx={{
                padding: 1,
                width: '50px',
                height: undefined,
                aspectRatio: 1,
                objectFit: 'contain',
              }}
            />
            <Typography
              sx={{
                ...globalStyles.textLowSmallLight,
                fontFamily: FontFamily.regular,
                color: Color.black,
              }}
              textAlign="center"
            >
              {item.name}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
