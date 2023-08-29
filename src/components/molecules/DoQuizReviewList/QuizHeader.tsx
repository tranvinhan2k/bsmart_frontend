import { IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';

interface Props {
  name: string;
  numberOfTotalQuestion: number;
  numberOfChosenQuestion: number;
}

export default function QuizHeader({
  name,
  numberOfTotalQuestion,
  numberOfChosenQuestion,
}: Props) {
  const navigate = useNavigate();
  return (
    <Stack>
      <Stack
        sx={{
          paddingY: 2,
          paddingX: 4,
          background: Color.white,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Stack>
            <IconButton onClick={() => navigate(-1)}>
              <Icon name="left" size="large" color="black" />
            </IconButton>
          </Stack>
          <Stack marginLeft={1}>
            <Stack
              sx={{
                marginTop: 1,
                fontSize: FontSize.medium_24,
                fontFamily: FontFamily.bold,
              }}
            >
              {name}
            </Stack>
            <Stack
              sx={{
                marginTop: 1,
                fontSize: FontSize.small_18,
                fontFamily: FontFamily.regular,
                color: Color.grey,
              }}
            >
              {`${numberOfChosenQuestion}/${numberOfTotalQuestion} câu đã được chọn`}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
