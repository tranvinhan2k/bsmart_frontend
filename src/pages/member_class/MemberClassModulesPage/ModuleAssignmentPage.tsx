import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import TextList from '~/components/atoms/texts/TextList';
import { ActivityAssignmentPayload } from '~/models/type';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';
import { formatDate } from '~/utils/date';

interface Props {
  name: string;
  item: ActivityAssignmentPayload;
}

export default function ModuleAssignmentPage({ name, item }: Props) {
  const { control, handleSubmit, formState } = useForm();

  const isMarked = true;

  const onSubmit = (data: any) => {};

  return (
    <Stack marginTop={1}>
      <Typography
        textAlign="center"
        sx={{
          fontSize: FontSize.medium_24,
          fontFamily: FontFamily.medium,
        }}
      >
        {name}
      </Typography>
      <Stack>
        <Typography
          sx={{
            fontSize: FontSize.small_14,
            fontFamily: FontFamily.bold,
          }}
        >
          Mô tả bài tập
        </Typography>
        <Typography
          sx={{
            marginY: 1,
            ...globalStyles.textLowSmallLight,
            color: Color.black,
          }}
        >
          {item.description}
        </Typography>
      </Stack>
      <TextList
        items={[
          {
            name: 'Ngày bắt đầu',
            value: formatDate(item.startDate),
          },
          {
            name: 'Ngày kết thúc',
            value: formatDate(item.endDate),
          },
          {
            name: 'Thời gian cho phép chỉnh sửa sau khi submit',
            value: `${item.editBeForSubmitMin} phút`,
          },
        ]}
      />
      {isMarked ? (
        <Stack>Hiển thị điểm số của bài assignment</Stack>
      ) : (
        <Stack>
          <Typography
            sx={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.bold,
            }}
          >
            Nộp bài làm
          </Typography>
          <FormInput control={control} name="files" variant="files" />
          <Box marginTop={1}>
            <Button
              disabled={!formState.isDirty}
              onClick={handleSubmit(onSubmit, handleConsoleError)}
              variant="contained"
            >
              Thêm bài làm
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
