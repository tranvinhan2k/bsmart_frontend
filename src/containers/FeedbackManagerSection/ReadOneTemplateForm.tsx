import { Stack, Typography } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import TextLine from '~/components/atoms/TextLine';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import globalStyles from '~/styles';

interface ReadOneTemplateFormProps {
  row: any;
}

export default function ReadOneTemplateForm({ row }: ReadOneTemplateFormProps) {
  console.log('row', row);

  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vw',
      }}
    >
      <Typography textAlign="center" sx={globalStyles.textSubTitle}>
        Chi tiết bản mẫu đánh giá
      </Typography>
      <Stack>
        <Typography
          sx={{
            ...globalStyles.textSmallLabel,
            marginY: 1,
          }}
        >
          Thông tin chung
        </Typography>

        <TextPropLine icon="feedback" label="Tên đánh giá" value={row.name} />
        <TextPropLine
          icon="feedback"
          label="Đánh giá mặc định"
          value={row.isDefault ? 'Mặc định' : 'Không'}
        />
        <TextPropLine
          icon="feedback"
          label="Trạng thái chỉnh sửa"
          value={row.isFixed ? 'Đã khóa' : 'Cho phép chỉnh sửa'}
        />
      </Stack>
      <Stack>
        <Typography
          sx={{
            ...globalStyles.textSmallLabel,
            marginY: 1,
          }}
        >
          Thông tin câu hỏi
        </Typography>
        {row?.questions?.map((item: any, index: number) => (
          <TextPropLine
            key={index}
            icon="question"
            label={item?.question || ''}
            value={item?.answer || ''}
          />
        ))}
      </Stack>
      <Stack>
        <Typography
          sx={{
            ...globalStyles.textSmallLabel,
            marginY: 1,
          }}
        >
          Danh sách lớp học đã chọn
        </Typography>
      </Stack>
    </Stack>
  );
}
