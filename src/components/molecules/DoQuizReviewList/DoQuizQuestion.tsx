import { Radio, Stack, Typography, Checkbox } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export interface DoQuizAnswerPayload {
  id: number;
  value: string;
  isChosen: boolean;
  isRight?: boolean;
}

interface Props {
  isReview: boolean;
  isMultipleAnswer: boolean;
  index: number;
  total: number;
  question: string;
  answers: DoQuizAnswerPayload[];
  onChangeAnswer: (
    questionIndex: number,
    answers: DoQuizAnswerPayload[]
  ) => void;
}

export default function DoQuizQuestion({
  answers,
  isMultipleAnswer,
  index,
  isReview,
  onChangeAnswer,
  question,
  total,
}: Props) {
  const handleCheckbox = (id: number) => {
    let params = [...answers];

    const answer = params.find((item) => item.id === id);
    if (answer?.isChosen === false) {
      params = params.map((item) => {
        if (item.id === answer.id) {
          return {
            ...item,
            isChosen: true,
          };
        }
        if (isMultipleAnswer) {
          return item;
        }
        return {
          ...item,
          isChosen: false,
        };
      });
    } else {
      params = params.map((item) => {
        if (item.id === answer?.id) {
          return {
            ...item,
            isChosen: false,
          };
        }
        return item;
      });
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
          marginTop: 1,
          fontSize: FontSize.small_18,
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
                border: '1px solid #ddd',
                // eslint-disable-next-line no-nested-ternary
                background: isReview
                  ? // eslint-disable-next-line no-nested-ternary
                    item.isRight
                    ? Color.green
                    : item.isChosen
                    ? Color.red
                    : Color.white
                  : Color.white,
                marginTop: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {isMultipleAnswer ? (
                <Checkbox
                  disabled={isReview}
                  onChange={() => handleCheckbox(item.id)}
                  checked={item.isChosen}
                />
              ) : (
                <Radio
                  disabled={isReview}
                  onChange={() => handleCheckbox(item.id)}
                  checked={item.isChosen}
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
