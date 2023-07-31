import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import MarkDisplay from '~/components/atoms/MarkDisplay';
import { ActivityAssignmentPayload } from '~/models/type';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';
import ModuleActivity from './ModuleActivity';

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
      <ModuleActivity name={name} description={item.description} />
      <Stack paddingBottom={2}>
        <Typography
          dangerouslySetInnerHTML={{
            __html: item.description,
          }}
          textAlign="center"
          sx={globalStyles.textSmallLight}
        />
      </Stack>
      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
      >{`Bài tập này sẽ được mở vào ngày ${item.startDate}`}</Typography>
      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
      >{`Bài tập sẽ sẽ kết thúc vào ngày ${item.endDate}`}</Typography>
      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
      >{`Thời gian cho chỉnh sửa: ${item.editBeForSubmitMin} phút`}</Typography>
      {isMarked ? (
        <MarkDisplay point={7} total={10} />
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
