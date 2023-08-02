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
import {
  formatISODateDateToDisplayDateTime,
  formatISODateStringToDisplayDateTime,
} from '~/utils/date';
import {
  useDeleteFile,
  useGetIdFromUrl,
  useMemberSubmitAssignment,
  useTryCatch,
} from '~/hooks';
import { PostSubmitActivityRequest } from '~/models';
import { useBoolean } from '~/hooks/useBoolean';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';

interface Props {
  name: string;
  item: ActivityAssignmentPayload;
}

export default function ModuleAssignmentPage({ name, item }: Props) {
  const moduleId = useGetIdFromUrl('moduleId');
  const { value, toggle } = useBoolean(false);
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      note: item.note,
      attachFiles: {
        files:
          item.attachFiles.map((subItem: any) => ({
            ...subItem,
            fileType: 'ATTACH',
          })) || [],
        deleteIndexes: [],
      },
    },
  });
  const { mutateAsync: handleSubmitAssignment } = useMemberSubmitAssignment();
  const { mutateAsync: handleDeleteFiles } = useDeleteFile();

  const { handleTryCatch } = useTryCatch('nộp bài tập');
  const isMarked = false;

  const onSubmit = async (data: any) => {
    const params: PostSubmitActivityRequest = {
      note: data.note || '',
      submittedFiles:
        data.attachFiles.files.filter(
          (subItem: any) => subItem?.fileType !== 'ATTACH'
        ) || [],
    };

    await handleTryCatch(async () => {
      if (data?.attachFiles?.deleteIndexes?.length > 0) {
        await handleDeleteFiles(data.attachFiles.deleteIndexes);
      }
      await handleSubmitAssignment({
        id: moduleId,
        params,
      });
    });
    toggle();
  };

  return (
    <Stack marginTop={1}>
      <ModuleActivity name={name} description={item.description} />
      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
      >{`Bài tập này sẽ được mở vào ngày ${formatISODateDateToDisplayDateTime(
        item.startDate
      )}`}</Typography>
      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
      >{`Bài tập sẽ sẽ kết thúc vào ngày ${formatISODateStringToDisplayDateTime(
        item.endDate
      )}`}</Typography>
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
          <FormInput
            placeholder="Thêm ghi chú"
            control={control}
            name="note"
            variant="multiline"
          />
          <Stack marginTop={1} />
          <FormInput control={control} name="attachFiles" variant="files" />
          <Box marginTop={1}>
            <Button
              disabled={!formState.isDirty}
              onClick={toggle}
              variant="contained"
            >
              {item.attachFiles.length !== 0
                ? 'Cập nhật bài làm'
                : 'Thêm bài làm'}
            </Button>
          </Box>
          <ConfirmDialog
            content="Bạn có chắc chắn nộp bài tập này ?"
            handleAccept={handleSubmit(onSubmit, handleConsoleError)}
            handleClose={toggle}
            open={value}
            title="Xác nhận nộp bài tập"
          />
        </Stack>
      )}
    </Stack>
  );
}
