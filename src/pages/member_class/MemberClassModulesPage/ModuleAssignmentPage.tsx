import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { validateDate } from '@mui/x-date-pickers/internals';
import { useEffect } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import MarkDisplay from '~/components/atoms/MarkDisplay';
import { ActivityAssignmentPayload } from '~/models/type';
import globalStyles from '~/styles';
import { convertToHigherByteUnit, handleConsoleError } from '~/utils/common';
import ModuleActivity from './ModuleActivity';
import {
  useDeleteFile,
  useGetIdFromUrl,
  useMemberSubmitAssignment,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { PostSubmitActivityRequest } from '~/models';
import { useBoolean } from '~/hooks/useBoolean';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import Icon from '~/components/atoms/Icon';
import { image } from '~/constants/image';
import { openUrl } from '~/utils/window';
import { validationAssignment } from '~/form/validation';
import { useGetAssignmentResult } from '~/hooks/quiz/useGetAssignmentResult';

interface Props {
  name: string;
  item: ActivityAssignmentPayload;
  refetch: any;
}

export default function ModuleAssignmentPage({ name, item, refetch }: Props) {
  const moduleId = useGetIdFromUrl('moduleId');
  const classId = useGetIdFromUrl('id');

  const { data: result } = useGetAssignmentResult({
    assignmentId: item.assignmentId,
    classId,
  });

  const { value, toggle } = useBoolean(false);

  const resolver = useYupValidationResolver(validationAssignment);
  const { control, handleSubmit, reset } = useForm({
    resolver,
    defaultValues: {
      note: item.note,
    },
  });

  useEffect(() => {
    reset({
      note: result?.note || '',
      attachFiles: {
        files: result?.assignmentFiles || [],
        deleteIndexes: [],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const { mutateAsync: handleSubmitAssignment } = useMemberSubmitAssignment();
  const { mutateAsync: handleDeleteFiles } = useDeleteFile();

  const { handleTryCatch } = useTryCatch('nộp bài tập');
  const isMarked = false;

  const onSubmit = async (data: any) => {
    const params: PostSubmitActivityRequest = {
      note: data.note || '',
      password: data?.password || '',
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
      await refetch();
    });
    toggle();
  };

  return (
    <Stack marginTop={1}>
      <ModuleActivity name={name} description={item.description} />

      <Typography
        textAlign="center"
        sx={globalStyles.textLowSmallLight}
      >{`Thời gian cho chỉnh sửa: ${item.editBeForSubmitMin} phút`}</Typography>
      <Typography textAlign="center" sx={globalStyles.textSmallLabel}>
        Tệp đính kèm
      </Typography>
      {item.attachFiles.map((file, index) => (
        <Stack
          key={index}
          sx={{
            border: '1px solid #ddd',
            borderRadius: MetricSize.small_5,
            paddingY: 1,
            marginY: 1,
          }}
        >
          <Stack
            sx={{
              paddingRight: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                component="img"
                src={image.file}
                sx={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                }}
              />
              <Stack>
                <Typography sx={globalStyles.textLowSmallLight}>
                  {file.name}
                </Typography>
                <Typography sx={globalStyles.textLowSmallLight}>
                  {`${convertToHigherByteUnit(file.size || 0)}`}
                </Typography>
              </Stack>
            </Stack>
            <Button
              onClick={() => openUrl(file.url)}
              startIcon={<Icon name="down" color="white" size="small_20" />}
              variant="contained"
              color="secondary"
              sx={{ color: Color.white, justifySelf: 'flex-end' }}
            >
              tải về
            </Button>
          </Stack>
        </Stack>
      ))}
      {isMarked ? (
        <MarkDisplay point={7} total={10} />
      ) : (
        <Stack marginTop={1}>
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
            label="Thêm ghi chú"
          />
          <Stack marginTop={1} />
          <FormInput
            control={control}
            name="attachFiles"
            variant="files"
            label="Thêm bài nộp"
          />
          <Stack marginTop={1} />
          <FormInput
            control={control}
            name="password"
            variant="password"
            label="Thêm nhập mật khẩu"
          />
          <Box marginTop={1}>
            <Button onClick={toggle} variant="contained">
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
