import { Stack, Typography } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import TextLine from '~/components/atoms/TextLine';
import globalStyles from '~/styles';

interface ReadOneTemplateFormProps {
  row: any;
}

export default function ReadOneTemplateForm({ row }: ReadOneTemplateFormProps) {
  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Bản mẫu</Typography>
      <TextLine label="Tên câu hỏi" variable={row.templateName} />
      {row?.questionList && (
        <Stack>
          <TextLine label="Danh sách câu trả lời" variable="" />
          <Stack
            sx={{
              padding: MetricSize.medium_15,
              background: '#eeeeee',
              marginTop: MetricSize.small_10,
            }}
          >
            {row?.questionList &&
              Object.keys(row?.question).map((item: any) => (
                <TextLine
                  key={item}
                  label={row.question}
                  variable={row.question}
                />
              ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
