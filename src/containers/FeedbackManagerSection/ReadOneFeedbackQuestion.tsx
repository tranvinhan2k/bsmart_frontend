import { Stack, Typography } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import TextLine from '~/components/atoms/TextLine';
import globalStyles from '~/styles';

interface ReadOneFeedbackQuestionProps {
  row: any;
}

export default function ReadOneFeedbackQuestion({
  row,
}: ReadOneFeedbackQuestionProps) {
  console.log(row);

  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Câu hỏi đánh giá</Typography>
      <TextLine label="Tên câu hỏi" variable={row.question} />
      <TextLine label="Loại câu hỏi" variable={row.questionType.label} />
      {row?.possibleAnswer && (
        <Stack>
          <TextLine label="Danh sách câu trả lời" variable="" />
          <Stack
            sx={{
              padding: MetricSize.medium_15,
              background: '#eeeeee',
              marginTop: MetricSize.small_10,
            }}
          >
            {row?.possibleAnswer &&
              Object.keys(row?.possibleAnswer).map((item: any) => (
                <TextLine
                  key={item}
                  label={item}
                  variable={row.possibleAnswer[item]}
                />
              ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
