import { Radio, Stack, Typography, Checkbox } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export interface DoQuizAnswerPayload {
  id: number;
  value: string;
}

interface Props {
  isMultipleAnswer: boolean;
  index: number;
  total: number;
  question: string;
  correctAnswerId: number[];
  answers: DoQuizAnswerPayload[];
  onChangeAnswer: (questionIndex: number, answerId: number[]) => void;
}

export default function DoQuizQuestion({
  answers,
  isMultipleAnswer,
  index,
  onChangeAnswer,
  question,
  correctAnswerId,
  total,
}: Props) {
  const handleCheckbox = (id: number) => {
    let params = [...correctAnswerId];

    const isExisted = params.findIndex((item) => item === id);
    if (isExisted === -1) {
      if (!isMultipleAnswer) {
        params = [id];
      } else {
        params = [...params, id];
      }
    } else {
      params = params.filter((item) => item !== id);
    }
    onChangeAnswer(index, params);
  };

  return (
    <Stack marginTop={4}>
      <Stack
        sx={{
          fontSize: FontSize.small_14,
          fontFamily: FontFamily.regular,
          color: Color.grey,
        }}
      >{`Câu thứ ${index + 1} trên ${total} câu `}</Stack>
      <Stack
        sx={{
          marginTop: 2,
          fontSize: FontSize.small_16,
          fontFamily: FontFamily.regular,
          color: Color.black,
        }}
      >
        {question}
      </Stack>
      <Stack marginTop={1}>
        {answers.map((item, idx) => {
          return (
            <Stack
              key={idx}
              sx={{
                padding: 1,
                borderRadius: MetricSize.small_5,
                background: Color.white,
                marginTop: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {isMultipleAnswer ? (
                <Checkbox
                  onChange={() => handleCheckbox(item.id)}
                  checked={correctAnswerId.includes(item.id)}
                />
              ) : (
                <Radio
                  onChange={() => handleCheckbox(item.id)}
                  checked={correctAnswerId.includes(item.id)}
                />
              )}
              <Typography>{item.value}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
