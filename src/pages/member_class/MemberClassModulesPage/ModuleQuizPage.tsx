import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FontSize, FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import TextList from '~/components/atoms/texts/TextList';
import { ActivityQuizPayload } from '~/models/type';
import globalStyles from '~/styles';
import { formatDate, formatISODateDateToDisplayDateTime } from '~/utils/date';

interface Props {
  name: string;
  item: ActivityQuizPayload;
}

export default function ModuleQuizPage({ name, item }: Props) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {};

  return (
    <Stack marginTop={1}>
      <Typography sx={globalStyles.textSmallLabel}>{name}</Typography>
      <Stack marginTop={1} />
      <TextList
        items={[
          {
            name: 'Mã bài kiểm tra',
            value: item.code,
          },
          {
            name: 'Ngày bắt đầu ',
            value: formatISODateDateToDisplayDateTime(item.startDate),
          },
          {
            name: 'Ngày kết thúc',
            value: formatISODateDateToDisplayDateTime(item.endDate),
          },
          {
            name: 'Thời gian làm bài',
            value: `${item.time} phút`,
          },
        ]}
      />
      <Typography
        sx={{
          fontSize: FontSize.small_14,
          fontFamily: FontFamily.bold,
        }}
      >
        Mật khẩu
      </Typography>
      <FormInput control={control} name="password" variant="password" />

      <Box marginTop={1}>
        <Button variant="contained">Xác nhận</Button>
      </Box>
    </Stack>
  );
}
